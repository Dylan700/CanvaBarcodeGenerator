# Canva Barcode Generator App

Generate barcodes in different sizes and colours in Canva! This app supports the following barcodes:
   - EAN13 
   - EAN8 
   - UPC 
   - CODE39 
   - ITF14 
   - MSI 
   - Pharmacode 
   - Codabar

![barcode_gif](https://github.com/Dylan700/CanvaBarcodeGenerator/assets/54528768/2905c54f-732b-4582-b6bf-a49c8bd2a4ad)

## Requirements

- Node.js `v18` (npm v9) or higher

**Note:** To make sure you're running the correct version of Node.js, we recommend using a version manager, such as [nvm](https://github.com/nvm-sh/nvm#intro). The .nvmrc file in the root directory of this repo will ensure the correct version is used.

## Quick start

```bash
git clone git@github.com:Dylan700/CanvaBarcodeGenerator.git
cd canva-apps-sdk-starter-kit
npm install
```

## Development

### Step 1: Start the local development server

The `src` directory contains the boilerplate of an app.

To start the boilerplate's development server, run the following command:

```bash
npm start
```

The server becomes available at http://localhost:8080.

The app's source code is in the `src/app.tsx` file.

### Step 2: Preview the app

The local development server only exposes a JavaScript bundle, so you can't preview an app by visiting http://localhost:8080. You can only preview an app via the Canva editor.

To preview an app:

1. Create an app via the [Developer Portal](https://www.canva.com/developers).
2. Select **Extension source > Development URL**.
3. In the **Development URL** field, enter the URL of the development server.
4. Click **Preview**. This opens the Canva editor (and the app) in a new tab.
5. Click **Use**. (This screen only appears when when using an app for the first time.)

The app will appear in the side panel.

### (Optional) Step 3: Enable Hot Module Replacement

By default, every time you make a change to an app, you have to reload the entire app to see the results of those changes. If you enable [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) (HMR), changes will be reflected without a full reload, which significantly speeds up the development loop.

**Note:** HMR does **not** work while running the development server in a Docker container.

To enable HMR:

1. Navigate to the [Your apps](https://www.canva.com/developers/apps) page.
2. Copy the ID of an app from the **App ID** column.
3. In the starter kit's `.env` file:

   1. Set `CANVA_APP_ID` to the ID of the app.
   2. Set `CANVA_HMR_ENABLED` to `TRUE`.

   For example:

   ```bash
   CANVA_APP_ID=AABBccddeeff
   CANVA_BACKEND_PORT=3001
   CANVA_FRONTEND_PORT=8080
   CANVA_BACKEND_HOST=http://localhost:3001
   CANVA_HMR_ENABLED=TRUE
   ```

4. Restart the local server.

## Previewing apps in Safari

By default, the development server is not HTTPS-enabled. This is convenient, as there's no need for a security certificate, but it prevents apps from being previewed in Safari.

<details>
  <summary>Why Safari requires the development server to be HTTPS-enabled</summary>

Canva itself is served via HTTPS and most browsers prevent HTTPS pages from loading scripts via non-HTTPS connections. Chrome and Firefox make exceptions for local servers, such as `localhost`, but Safari does not, so if you're using Safari, the development server must be HTTPS-enabled.

To learn more, see [Loading mixed-content resources](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content#loading_mixed-content_resources).

</details>

To preview apps in Safari:

1. Start the development server with HTTPS enabled:

   ```bash
   # Run the main app
   npm start --use-https

   # Run an example
   npm start <example-name> --use-https
   ```

2. Navigate to <https://localhost:8080>.
3. Bypass the invalid security certificate warning:
   1. Click **Show details**.
   2. Click **Visit website**.
4. In the Developer Portal, set the app's **Development URL** to <https://localhost:8080>.

You need to bypass the invalid security certificate warning every time you start the local server. A similar warning will appear in other browsers (and will need to be bypassed) whenever HTTPS is enabled.
