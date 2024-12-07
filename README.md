# AppCenter

**AppCenter** is an app store built with Angular, Bootstrap, and other modern technologies. It allows users to explore, search, and view available apps, as well as access the detailed view of each app.

## Requirements

Before you begin, make sure you have **Node.js version 18 or later** installed. You can check your Node.js version with the following command:

```bash
node -v
```

If you need to install or upgrade Node.js, you can do so from the official Node.js website.

## Installation

```bash
npm install
```

This will install all the necessary dependencies for the project to run.

## Generate Apps

Before starting the project, you need to generate the apps using the npm run generate-flatpak script. This script will download and process the available apps for the store.

To generate the apps, run:

```bash
npm run generate-flatpak
```

This step is essential to load the app data into the store.

## Run the Project

Once the apps are generated, you can run the project locally with the following command:

```bash
npm run start
```

This command will start a local development server, typically accessible at http://localhost:4200
