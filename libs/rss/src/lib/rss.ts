import {
  getMyConfig,
  HandledRoute,
  log,
  registerPlugin,
  scullyConfig
} from '@scullyio/scully';
import { Feed } from "feed";
import * as fs from 'fs';
import * as path from 'path';
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
    : (feed = new Feed({
      title: options.title,
      id: options.siteUrl,
      description: "This is my personal feed!",
      copyright: `All rights reserved ${new Date().getFullYear()}, Jeffrey Bosch`,
      link: options.siteUrl,
      updated: new Date(),
      generator: 'Scully RSS',
      favicon: `${options.siteUrl}/favicon.ico`,
      feedLinks: {
        rss: `${options.siteUrl}${options.rssPath}`,
      },
      author: {
        name: "Jeffrey Bosch",
        email: "jefiozie.bosch@gmail.com",
        link: "https://github.com/jefiozie"
      }
    }));
  /* eslint-enable */
  routes
    .filter((route) => route.data && route.data.published)
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1))
    .forEach((route) => {
      const mdString = fs.readFileSync(route.templateFile, 'utf8').toString();
      const converter = new showdown.Converter();
      mdString.slice(
        getPosition(mdString, '---', 2) + 3,
        mdString.length - 1
      );
      const htmlContent = converter.makeHtml(mdString);

      feed.addItem({
        title: route.data.title,
        description: route.data.description,
        guid: `${dropEndingSlash(options.siteUrl)}${route.route}`,
        url: `${dropEndingSlash(options.siteUrl)}${route.route}`,
        date: new Date(route.data.date),
        content: htmlContent
      });
    });
  const files = [path.join(scullyConfig.outDir, options.rssPath)];
  const write = (file) => {
    fs.writeFileSync(file, feed.rss2());
  };
  files.forEach(write);
  log(`Finished rss plugin`);
  log(``);

  return;
};
export const rssPlugin = 'rssFeedPlugin';
registerPlugin('routeDiscoveryDone', rssPlugin, rssFeedPlugin);
function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}