import fs from 'fs';
import path from 'path';
import express from 'express';
import config from './app.js';
import compression from 'compression';

/**
 * This is the entry point of the build which is defined in vite.config.js (build.rollupOptions.input)
 */
const VITE_BUILD_ENTRY_POINT = 'vite-build-entry.html';

let assets = { scripts: [], styles: [] };

/**
 * If the environment is production, read the manifest file and get the scripts and styles from it.
 * @note Add slash to the beginning of the file path to make it relative to the root directory
 *
 * @see https://vitejs.dev/guide/backend-integration
 */
if (config.env === 'production') {
    const manifest = JSON.parse(fs.readFileSync(path.resolve('dist/.vite/manifest.json'), 'utf-8'));

    const addAssets = function (item, isImportedItem = false) {
        assets.scripts.push({
            type: isImportedItem ? 'modulepreload' : 'module',
            path: '/' + item.file,
        });

        if (item.css) {
            item.css.forEach((file) => {
                assets.styles.push({
                    path: '/' + file,
                });
            });
        }

        if (item.imports) {
            item.imports.forEach((importedItem) => {
                addAssets(manifest[importedItem], true);
            });
        }
    };

    addAssets(manifest[VITE_BUILD_ENTRY_POINT]);
} else {
    /**
     * Single entry point for the application JavaScript cline-side code.
     *
     * If you're needed to import multiple files, you SHOULD use the `import` statement in this JavaScript file.
     * Or place the script tag in the EJS file of the view directly to specify individual file for each view separately.
     */
    assets.scripts.push({
        type: 'module',
        path: '/src/resources/scripts/application.js',
    });
}

/**
 * Setup application assets
 *
 * The SetupApplicationAssets function is an Express.js app configures the application to use
 * specific CSS and JavaScript files by storing them in app.locals for easy access in views,
 * and it sets up the application to serve static files like images and scripts from a designated directory,
 * depending on whether the app is in production or development mode.
 */
const SetupApplicationAssets = (app) => {
    /**
     * Set serve static files location
     *
     * @see https://expressjs.com/en/starter/static-files.html
     */
    app.use(express.static(config.env === 'production' ? 'dist' : 'public'));

    /**
     * Set application CSS and JS assets to be used in views
     */
    app.locals.styles = assets.styles;
    app.locals.scripts = assets.scripts;

    /**
     * Compress responses
     *
     * The compression library in Express.js is used to reduce the size of the response body that is sent to clients.
     * This is achieved by compressing the data, typically using algorithms like Gzip or Brotli.
     *
     * @see https://expressjs.com/en/resources/middleware/compression.html
     */
    app.use(compression());
};

export default SetupApplicationAssets;
