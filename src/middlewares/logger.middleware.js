import morgan from 'morgan';

morgan.token('error-msg', (req, res) => {
    if (res.statusCode >= 400 && res.locals.errorMessage) {
        return res.locals.errorMessage;
    }
    return '';
});

const formatString = '[Gateway] :method :url - :status - :response-time ms - :remote-addr :error-msg';

export const logger = morgan((tokens, req, res) => {
    let logLine = [
        '[Gateway]',
        tokens.method(req, res),
        tokens.url(req, res),
        '-',
        tokens.status(req, res),
        '-',
        tokens['response-time'](req, res), 'ms',
        '-',
        tokens['remote-addr'](req, res)
    ].join(' ');

    if (res.statusCode >= 400 && res.locals.errorMessage) {
        logLine += ` - Error: ${res.locals.errorMessage}`;
    }

    return logLine;
});

export const errorCaptureMiddleware = (req, res, next) => {
    const originalJson = res.json;
    res.json = function (body) {
        if (res.statusCode >= 400 && body && body.error) {
            res.locals.errorMessage = body.error;
        }
        return originalJson.apply(this, arguments);
    };
    next();
};
