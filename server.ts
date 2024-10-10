import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';
import * as pako from 'pako';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  server.get('/api/apps', async (req, res) => {
    try {
      const response = await axios.get(
        'http://flatpak.elementary.io/repo/appstream/x86_64/appstream.xml.gz',
        {
          responseType: 'arraybuffer',
        }
      );

      const decompressedData = pako.inflate(new Uint8Array(response.data), {
        to: 'string',
      });

      const parser = new XMLParser();
      const json = parser.parse(decompressedData, {
        allowBooleanAttributes: true,
      });

      if (json) {
        res.json(json);
      } else {
        res.status(500).send({ error: 'Error al procesar el archivo XML' });
      }
    } catch (error) {
      res
        .status(500)
        .send({ error: 'Error al descargar o procesar el archivo' });
    }
  });

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
