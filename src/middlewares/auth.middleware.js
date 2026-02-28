import jwt from 'jsonwebtoken';

export const authenticate = (requiresAuth) => {
    return (req, res, next) => {
        // 1. Skip if route is public
        if (!requiresAuth) {
            return next();
        }

        // 2. Secret check
        if (!process.env.JWT_SECRET) {
            console.error('CRITICAL: JWT_SECRET environment variable is not defined.');
            return res.status(500).json({ error: 'Internal server error' });
        }

        // 3. Extract Token
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        // 4. Verification
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Inject internal headers
            // Note: Header values must be strings
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
