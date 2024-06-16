import helmet from 'helmet';
import cors from 'cors';
import csrf from 'csurf';
import rateLimit from 'express-rate-limit';

/**
 * Provides protection against Cross-Site Request Forgery (CSRF) attacks.
 *
 * CSRF attacks occur when a malicious website tricks a user into performing actions on another site where they are
 * authenticated, like submitting forms.
 *
 * When a request is received, the middleware checks the token to ensure it matches the one originally generated,
 * thereby confirming the request is legitimate and not a forgery.
 *
 * @see https://owasp.org/www-community/attacks/csrf
 */
const CSRFProtection = csrf({ cookie: true });

/**
 * Limits the number of requests a client can make to the server over a specified period to prevent abuse
 * and mitigate Denial-of-Service (DoS) attacks.
 *
 * @see https://owasp.org/www-community/attacks/Denial_of_Service
 */
const RateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 1000, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

/**
 * Helps secure Express apps by setting various HTTP headers.
 *
 * HTTP Headers are a great booster for web security with easy implementation.
 * Proper HTTP response headers can help prevent security vulnerabilities like Cross-Site Scripting,
 * Clickjacking, Information disclosure, and more
 *
 * @see https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
 */
const SecureHTTPHeaders = helmet();

/**
 * Enables Cross-Origin Resource Sharing (CORS)
 *
 * To allow or restrict requested resources on a web server depending on where the HTTP request was initiated.
 *
 * @see https://owasp.org/www-community/attacks/CORS_OriginHeaderScrutiny
 */
const CORSProtection = cors();

export default {
    CSRFProtection,
    CORSProtection,
    RateLimiter,
    SecureHTTPHeaders,
};
