// server.js
import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
dotenv.config();

import sequelize from './config/db.js';
import productsRoutes from './routes/Products.js';
import termsRoutes from './routes/terms.js';

const app = Fastify({ logger: true });

// ✅ Allow Any Origin (All Domains)
await app.register(cors, {
  origin: '*', // Allow any domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow any headers you need
  credentials: true, // Optional: Allow cookies
});

// ✅ Register your routes with correct base URL
await app.register(productsRoutes, { prefix: '/api' });
await app.register(termsRoutes, { prefix: '/api' });

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
