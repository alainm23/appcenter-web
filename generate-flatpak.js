const fs = require('fs');
const path = require('path');
const axios = require('axios');
const pako = require('pako');
const { xml2json } = require('xml-js');

const default_lang = 'en';

async function downloadAppStream() {
    try {
        const response = await axios.get(
            'http://flatpak.elementary.io/repo/appstream/x86_64/appstream.xml.gz',
            {
                responseType: 'arraybuffer',
            },
        );

        const decompressedData = pako.inflate(new Uint8Array(response.data), {
            to: 'string',
        });
        const rawJson = xml2json(decompressedData, { compact: true, spaces: 2 });
        const parsedJson = JSON.parse(rawJson);

        const apps = parseApps(parsedJson);

        const outputDir = path.resolve(__dirname, './public');
        const outputFilePath = path.join(outputDir, 'appstream.json');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputFilePath, JSON.stringify(apps, null, 2), 'utf8');

    } catch (error) {
        console.error(error);
    }
}

function parseApps(json) {
    const apps = [];

    json.components.component.forEach((element) => {
        apps.push({
            id: element.id._text,
            name: getTranslateValue(element, 'name'),
            categories: element?.categories?.category,
            developer_name: element.developer_name?._text,
            icon: getAppIcon(element),
            summary: getTranslateValue(element, 'summary'),
        });
    });

    return apps;
}

function getTranslateValue(element, key) {
    const name = {};

    if (Array.isArray(element[key])) {
        element[key].forEach((value) => {
            const lang = value._attributes?.['xml:lang'] ?? default_lang;
            name[lang] = value._text;
        });

        return name;
    }

    name[default_lang] = element[key]._text;
    return name;
}

function getAppIcon(element) {
    if (Array.isArray(element.icon) && element.icon.length > 0) {
        return element.icon[0]._text;
    }

    return null;
}

downloadAppStream();