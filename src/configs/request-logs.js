import morgan from 'morgan';
import path from 'path';
import { createStream } from 'rotating-file-stream';

/**
 * Setup HTTP request logs
 *
 * Request logs are essential for maintaining a secure, efficient, and user-friendly application.
 * They provide critical data for monitoring, debugging, performance analysis, security, compliance, user behavior
 * understanding, and system planning.
 *
 * Without request logs, managing and improving a web application would be much more challenging and less effective.
 * @see https://www.npmjs.com/package/morgan
 */
const setupHttpRequestLogs = (app) => {
    /**
     * In development we log only 4xx and 5xx responses to console
     */
    app.use(
        morgan('short', {
            skip: function (req, res) {
                return res.statusCode < 400;
            },
        }),
    );

    /**
     * Log all requests to access.log file
     */
    app.use(
        morgan('combined', {
            stream: createStream('access.log', {
                interval: '1d', // rotate daily,
                path: path.join('logs'),
            }),
        }),
    );
};

export default setupHttpRequestLogs;
