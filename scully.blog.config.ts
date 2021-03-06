import { getSitemapPlugin } from '@gammastream/scully-plugin-sitemap';
import { timeToRead, timeToReadOptions } from '@jefiozie/time-to-read';
import { RssOptions, rssPlugin } from '@jefiozie/rss-plugin';
import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { MinifyHtml } from 'scully-plugin-minify-html';

const publicUri = 'https://jefiozie.github.io';
setPluginConfig(rssPlugin, {
  title: 'RSS Feed',
  siteUrl: publicUri,
  rssPath: '/assets/rss.xml',
} as RssOptions);

setPluginConfig(timeToRead, {
  path: '/articles/article'
} as timeToReadOptions);

const postRenderers = [MinifyHtml, 'seoHrefOptimise'];
const SitemapPlugin = getSitemapPlugin();
setPluginConfig(SitemapPlugin, {
  urlPrefix: publicUri,
  sitemapFilename: 'sitemap.xml',
  changeFreq: 'monthly',
  priority: [
    '1.0',
    '0.9',
    '0.8',
    '0.7',
    '0.6',
    '0.5',
    '0.4',
    '0.3',
    '0.2',
    '0.1',
    '0.0',
  ],
  ignoredRoutes: ['/404'],
  routes: {
    '/articles/article/:id': {
      changeFreq: 'daily',
      priority: '0.9',
      sitemapFilename: 'sitemap-articles.xml',
    },
  },
});

export const config: ScullyConfig = {
  projectRoot: './apps/blog/src',
  projectName: 'blog',
  outDir: './dist/static',
  routes: {
    '/articles/article/:id': {
      type: 'contentFolder',
      id: {
        folder: './articles',
      },
      postRenderers,
    },
  },
};
