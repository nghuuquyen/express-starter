/**
 * Middleware to set utility function that uses to check if request is an AJAX request
 */
const isAjax = (req, res, next) => {
    req.isAjax = () => {
        return (
            req.xhr ||
            req.headers['x-requested-with'] === 'XMLHttpRequest' ||
            req.headers['accept'].includes('application/json')
        );
    };
    next();
};

/**
 * Middleware to set CSRF token in response locals to be used in views
 */
const setCSRFToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

export default {
    isAjax,
    setCSRFToken,
}





