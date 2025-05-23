// routes/Products.js
import Product from '../models/Product.js';

// ✅ Fastify Plugin Style Route Declaration
export default async function productsRoutes(fastify, opts) {
  // ✅ Fetch all products
  fastify.get('/', async (req, reply) => {
    try {
      const products = await Product.findAll({ order: [['id', 'ASC']] });
      reply.send(products);
    } catch (err) {
      console.error('❌ Failed to fetch products:', err);
      reply.status(500).send({ error: 'Failed to fetch products' });
    }
  });

  // ✅ Add a new product (POST)
  fastify.post('/', async (req, reply) => {
    console.log("✅ POST Request Received:", req.body);
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return reply.status(400).send({ error: 'Invalid or empty request body' });
      }

      const newProduct = await Product.create(req.body);
      reply.status(201).send(newProduct);
    } catch (err) {
      console.error('❌ Failed to add product:', err);
      reply.status(500).send({ error: 'Failed to add product', details: err.message });
    }
  });

  // ✅ Update an existing product (PUT)
  fastify.put('/:id', async (req, reply) => {
    console.log("✅ PUT Request Received:", req.body);
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return reply.status(404).send({ error: 'Product not found' });
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        return reply.status(400).send({ error: 'Invalid or empty request body' });
      }

      await product.update(req.body);
      reply.send(product);
    } catch (err) {
      console.error('❌ Failed to update product:', err);
      reply.status(500).send({ error: 'Failed to update product', details: err.message });
    }
  });

  // ✅ Delete a product (DELETE)
  fastify.delete('/:id', async (req, reply) => {
    console.log("✅ DELETE Request for ID:", req.params.id);
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return reply.status(404).send({ error: 'Product not found' });
      }

      await product.destroy();
      reply.send({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error('❌ Failed to delete product:', err);
      reply.status(500).send({ error: 'Failed to delete product', details: err.message });
    }
  });
}
