import { getMyConfig, HandledRoute, registerPlugin } from '@scullyio/scully';
import * as fs from 'fs';
const readingTime =  require('reading-time');

export const timeToRead = 'timeToRead';
export interface timeToReadOptions {
  path: string;
}
export const timeToReadFunc = async (routes: HandledRoute[]) => {
  const options: timeToReadOptions = getMyConfig(timeToReadFunc);
  return routes
    .map((route) => {
      if (route.templateFile && route.route.startsWith(options.path)) {
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
};
registerPlugin('routeProcess', timeToRead, timeToReadFunc);
