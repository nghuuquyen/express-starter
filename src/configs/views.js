import path from 'path';
import expressLayouts from 'express-ejs-layouts';

/**
 * Set view engine and views directory and layout
 *
 * @see https://expressjs.com/en/guide/using-template-engines.html
 */
const setupViewTemplateEngine = (app) => {
    /**
     * EJS allows you to embed JavaScript into your HTML templates, making it easier to generate dynamic web pages.
     * By setting ejs as the view engine, you tell Express to render .ejs files using the EJS template engine.
     *
     * @see https://ejs.co/
     */
    app.set('view engine', 'ejs'); // Set view engine EJS

    /**
     * Directs Express to look for these .ejs files in the src/views directory.
     */
    app.set('views', path.join('src/views')); // Set views directory

    /**
     * By using express-ejs-layouts, you can define a common layout for your views, and the default layout is set to layouts/default.
     *
     * @see https://www.npmjs.com/package/express-ejs-layouts
     */
    app.use(expressLayouts);
    app.set('layout', 'layouts/default');   // Set default layout
    app.set('layout extractScripts', true); // Set script blocks extraction to place all the script blocks at the end
};

export default setupViewTemplateEngine;
