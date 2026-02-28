import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';
import { ROUTES } from './config/routes.config.js';
import { authenticate } from './middlewares/auth.middleware.js';
import { limiter } from './middlewares/rateLimit.middleware.js';
import { logger, errorCaptureMiddleware } from './middlewares/logger.middleware.js';

const app = express();

app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

app.use(errorCaptureMiddleware);
app.use(logger);

if (!process.env.USERS_SERVICE_URL || !process.env.MUSIC_SERVICE_URL) {
  console.error('CRITICAL: USERS_SERVICE_URL and MUSIC_SERVICE_URL environment variables are required.');
  process.exit(1);
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'gateway' });
});

app.use(limiter);

ROUTES.forEach((route) => {
  app.use(
    route.path,
    authenticate(route.requiresAuth),
    proxy(route.target, {
      proxyReqPathResolver: (req) => {
        return route.path + req.url;
      },
    })
  );
});

export default app;
