import fastifyCompress from '@fastify/compress';
import fastify from 'fastify';
import { ComciganRouter } from './routes/comcigan/index.js';
import { OfficeOfEducationRouter } from './routes/office-of-education/index.js';
import { SearchHandler } from './routes/search.js';

const PORT = process.env.PORT || 3000;

const app = fastify({
  logger: true,
});

app.register(fastifyCompress);

app.get('/search', SearchHandler);
app.register(ComciganRouter, { prefix: '/comcigan/' });
app.register(OfficeOfEducationRouter, { prefix: '/office-of-education/' });

app.listen(PORT);
