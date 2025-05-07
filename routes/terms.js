// backend/routes/terms.js
import Terms from '../models/Terms.js';

// ✅ Fastify Plugin Style Route Declaration
export default async function termsRoutes(fastify, opts) {
  // ✅ GET: Fetch terms with language filter
  fastify.get('/', async (req, reply) => {
    try {
      const { lang } = req.query;

      // Validate the language parameter
      if (!lang) {
        return reply.status(400).send({ message: 'Language parameter is required' });
      }

      // Fetch terms filtered by language
      const terms = await Terms.findAll({
        where: { language: lang },
        order: [['id', 'ASC']],
      });

      reply.send(terms);
    } catch (err) {
      console.error('❌ DB Fetch Error:', err);
      reply.status(500).send({ message: 'Error fetching terms' });
    }
  });
}
