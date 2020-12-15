import {
  getMyConfig,
  HandledRoute,
  log,
  registerPlugin,
  scullyConfig,
} from '@scullyio/scully';
import * as fs from 'fs';
import * as path from 'path';
import * as RSS from 'rss';
import { dropEndingSlash, pluralizer } from './utils';

const showdown = require('showdown');

export interface RssOptions {
  title: string;
  siteUrl: string;
  rssPath: string;
}
let feed = undefined;

export const rssFeedPlugin = async (routes: HandledRoute[]) => {
  const options: RssOptions = getMyConfig(rssFeedPlugin);

  log(``);
  log(`Started rss plugin`);
  log(
    `Generating feed for ${routes.length} ${pluralizer(
      routes.length,
      'route',
      'routes'
    )}.`
  );
  /* eslint-disable */
  feed !== undefined
    ? feed
    : (feed = new RSS({
        title: options.title,
        site_url: options.siteUrl,
        generator: 'Scully RSS',
        feed_url: `${options.siteUrl}${options.rssPath}`,
      }));
  /* eslint-enable */
  routes
    .filter((route) => route.data && route.data.published)
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1))
    .forEach((route) => {
      const mdString = fs.readFileSync(route.templateFile, 'utf8').toString();
      const converter = new showdown.Converter();
      const articleHTML = converter.makeHtml(mdString);
      console.error(articleHTML);

      feed.item({
        title: route.data.title,
        description: articleHTML,
        guid: `${dropEndingSlash(options.siteUrl)}${route.route}`,
        url: `${dropEndingSlash(options.siteUrl)}${route.route}`,
        date: new Date(route.data.date),
      });
    });
  const files = [path.join(scullyConfig.outDir, options.rssPath)];
  const write = (file) => {
    fs.writeFileSync(file, feed.xml());
  };
  files.forEach(write);
  log(`Finished rss plugin`);
  log(``);

  return;
};
export const rssPlugin = 'rssFeedPlugin';
registerPlugin('routeDiscoveryDone', rssPlugin, rssFeedPlugin);
