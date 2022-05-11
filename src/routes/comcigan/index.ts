import { FastifyPluginCallback } from 'fastify';
import { TimetableHandler } from './timetable.js';

export const ComciganRouter: FastifyPluginCallback = (
  instance,
  options,
  done,
) => {
  instance.get('/timetable', TimetableHandler);

  done();
};
