import 'express-async-errors';
import express from 'express';
import config from './configs/app.js';
import routes from './routes.js';
import cookieParser from 'cookie-parser';
import security from './configs/security.js';
import errorHandler from './middlewares/error-handler.js';
import setupViewTemplateEngine from './configs/views.js';
import setupApplicationAssets from './configs/assets.js';
import requestUtils from './middlewares/request-utils.js';
import setupHttpRequestLogs from './configs/request-logs.js';

const app = express();

/** Setup Local Variables */
app.locals.siteName = config.siteName; // Set site name

/** Setup Requests Logs */
setupHttpRequestLogs(app);

/** Setup Static Assets (ex. CSS, Javascript, Images files, etc...) */
setupApplicationAssets(app);

/** Setup View Engine */
setupViewTemplateEngine(app);

/** Setup Data Parsing */
app.use(cookieParser()); // Parse Cookie header and populate req.cookies
app.use(express.json()); // Parse application/json
app.use(express.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded

/** Setup Security Middlewares */
app.use(security.RateLimiter);
app.use(security.SecureHTTPHeaders);
app.use(security.CORSProtection);
app.use(security.CSRFProtection);

/** Setup Utility Middlewares */
app.use(requestUtils.isAjax);
app.use(requestUtils.setCSRFToken);

/** Setup Application routes */
app.use('/', routes);

/** Setup Error Handling */
app.use(errorHandler.FileNotFoundErrorHandler);
app.use(errorHandler.ApplicationErrorHandler);

export default app;
