import rateLimit from 'express-rate-limit';

const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000;
const max = parseInt(process.env.RATE_LIMIT_MAX) || 100;

export const limiter = rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json({
            error: 'Too many requests, please try again later'
        });
    },
});
