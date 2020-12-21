import { registerPlugin } from '@scullyio/scully';
import * as fs from 'fs';
import * as readingTime from 'reading-time';

export const readTimeFunc = async (routes: any) =>
  routes.map((route) => {
    // make configurable
    if (route.route.startsWith('/articles/article')) {
      const content = fs.readFileSync(route.templateFile).toString('utf-8');
      const stats = readingTime(content);
      return {
        ...route,
        data: {
          ...route.data,
          readingTime: stats.minutes > 1 ? stats.minutes : 1,
        },
      }
    }
    return route;
  });

export const readTimePlugin = 'readTimePlugin';
registerPlugin('routeProcess', readTimePlugin, readTimeFunc, 1);
