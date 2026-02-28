export const ROUTES = [
    {
        path: '/api/auth',
        target: process.env.USERS_SERVICE_URL,
        requiresAuth: false,
    },
    {
        path: '/api/users',
        target: process.env.USERS_SERVICE_URL,
        requiresAuth: false,
    },
    {
        path: '/api/tracks',
        target: process.env.MUSIC_SERVICE_URL,
        requiresAuth: false,
    },
    {
        path: '/api/votes',
        target: process.env.MUSIC_SERVICE_URL,
        requiresAuth: false,
    }
];
