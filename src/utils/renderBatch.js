import fs from 'fs';
import BatchManager from './BatchManager';
import { processBatch } from './lifecycle';
import logger from './logger';
import { envIsTrue } from './utils';
import { didShimPromise } from '../environment';

const shouldProfile = envIsTrue(process.env.HYPERNOVA_PROFILING);

export default (config, isClosing) => (req, res) => {
  const now = performance.now();

  // istanbul ignore if
  if (isClosing()) {
    logger.info('Starting request when closing!');
  }
  const jobs = req.body;

  const manager = new BatchManager(req, res, jobs, config);

  return processBatch(jobs, config.plugins, manager, config.processJobsConcurrently)
    .then(() => {
      // istanbul ignore if
      if (isClosing()) {
        logger.info('Ending request when closing!');
      }
      return res.status(manager.statusCode).json(manager.getResults()).end();
    })
    .catch(() => res.status(manager.statusCode).end())
    .finally(() => {
      if (!shouldProfile) return;

      const diff = performance.now() - now;
      const key = Object.values(jobs).map((v) => v.name).join('__');
      const line = `${diff},${key}\n`;
      fs.appendFileSync(`stats-${didShimPromise ? 'shim' : 'noshim'}.txt`, line, 'utf8');
    });
};
