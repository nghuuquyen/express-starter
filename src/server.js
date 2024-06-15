import app from './app.js';
import config from './configs/app.js';
import ViteExpress from 'vite-express';

const server = app.listen(config.port, config.host);

ViteExpress.bind(app, server, async () => {
    const { root, base } = await ViteExpress.getViteConfig();
    console.log(`Serving app from root ${root}`);
    console.log(`Server is listening at http://${config.host}:${config.port}${base}`);
})
