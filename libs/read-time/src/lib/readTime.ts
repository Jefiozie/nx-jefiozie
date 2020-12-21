import { getMyConfig, HandledRoute, registerPlugin } from '@scullyio/scully';
import * as fs from 'fs';
import * as readingTime from 'reading-time';

export const readTimePlugin = 'readTimePlugin';
export interface ReadTimePluginOptions {
  path: string
}
export const readTimeFunc = async (routes: HandledRoute[]) => {
  const options: ReadTimePluginOptions = getMyConfig(readTimeFunc);
  return routes.map((route) => {
    if (route.route.startsWith(options.path)) {
      const content = fs.readFileSync(route.templateFile).toString('utf-8');
      const stats = readingTime(content);
      const newRoute = {
        ...route,
        data: {
          ...route.data,
          readingTime: stats.minutes > 1 ? stats.minutes : 1,
        },
      };
      return newRoute;
    }
    return route;
  });
}
registerPlugin('routeProcess', readTimePlugin, readTimeFunc);
