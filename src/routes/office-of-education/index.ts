import { FastifyPluginCallback } from 'fastify';
import { LunchHandler } from './lunch.js';

export const OfficeOfEducationRouter: FastifyPluginCallback = (
  instance,
  options,
  done,
) => {
  instance.get('/lunch', LunchHandler);

  done();
};
