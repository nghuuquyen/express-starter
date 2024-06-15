import config from './app.js';
import fs from 'fs';
import path from 'path';

const VITE_BUILD_ENTRY_POINT = 'build/application.html';

let assets = { scripts: [], styles: [] };

/**
 * If the environment is production, read the manifest file and get the scripts and styles from it.
 * @note Add slash to the beginning of the file path to make it relative to the root directory
 *
 * @see https://vitejs.dev/guide/backend-integration
 */
if (config.env === 'production') {
    const manifest = JSON.parse(fs.readFileSync(path.resolve('dist/.vite/manifest.json'), 'utf-8'));

    assets.scripts.push('/' + manifest[VITE_BUILD_ENTRY_POINT].file);

    manifest[VITE_BUILD_ENTRY_POINT].css.forEach((file) => {
        assets.styles.push('/' + file);
    });
} else {
    assets.scripts.push('/src/resources/scripts/application.js');
}

export default assets;
