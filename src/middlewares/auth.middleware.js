import jwt from 'jsonwebtoken';

export const authenticate = (requiresAuth) => {
    return (req, res, next) => {
        if (!requiresAuth) {
            return next();
        }

        if (!process.env.JWT_SECRET) {
            console.error('CRITICAL: JWT_SECRET environment variable is not defined.');
            return res.status(500).json({ error: 'Internal server error' });
        }

        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.headers['X-User-Id'] = decoded.sub || decoded.id;
            req.headers['X-User-Role'] = decoded.role;

            if (decoded.genres) {
                req.headers['X-User-Genres'] = Array.isArray(decoded.genres)
                    ? decoded.genres.join(',')
                    : decoded.genres;
            }

            next();
        } catch (err) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
    };
};
