import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import express from 'express'
import loginHandler from './api/login.js'
import logoutHandler from './api/logout.js'
import authCheckHandler from './api/auth-check.js'
import videosHandler from './api/videos.js'
import uploadHandler from './api/upload.js'

function localApiPlugin() {
  return {
    name: 'local-api-plugin',
    configureServer(server) {
      server.middlewares.use(express.json());

      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) return next();

        const url = req.url.split('?')[0];

        try {
          if (url === '/api/login') {
            await loginHandler(req, res);
          } else if (url === '/api/logout') {
            await logoutHandler(req, res);
          } else if (url === '/api/auth-check') {
            await authCheckHandler(req, res);
          } else if (url === '/api/videos') {
            await videosHandler(req, res);
          } else if (url === '/api/upload') {
            await uploadHandler(req, res);
          } else {
            next();
          }
        } catch (err) {
          console.error('Local API middleware error:', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), localApiPlugin()],
})
