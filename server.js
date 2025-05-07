// server.js
import Fastify from 'fastify';
import cors from '@fastify/cors';
import formBody from '@fastify/formbody'; // ✅ Add this
import dotenv from 'dotenv';
dotenv.config();

import sequelize from './config/db.js';
import productsRoutes from './routes/Products.js';
import termsRoutes from './routes/terms.js';

const app = Fastify({ logger: true });

// ✅ Enable CORS for your frontend URL
await app.register(cors, {
  origin: '*', // Allow any domain (use specific URL in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

// ✅ Enable Body Parser for JSON (IMPORTANT)
await app.register(formBody);

// ✅ Register your routes with the correct prefix
await app.register(productsRoutes, { prefix: '/api/products' });
await app.register(termsRoutes, { prefix: '/api/terms' });

// ✅ Start the server
try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('✅ Database connected and models synced');

  await app.listen({
    port: process.env.PORT || 3001,
    host: '0.0.0.0', // For local and server deployment
  });
  console.log('✅ Server started successfully');
  console.log(`🚀 Server running at http://localhost:${process.env.PORT || 3001}`);
} catch (err) {
  console.error('❌ Server failed to start:', err);
}
