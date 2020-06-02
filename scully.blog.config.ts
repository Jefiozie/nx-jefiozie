const { MinifyHtml } = require('scully-plugin-minify-html');
import { getSitemapPlugin } from '@gammastream/scully-plugin-sitemap';
import { setPluginConfig, ScullyConfig } from '@scullyio/scully';

// THIS ONE WILL FAIL
import * as jb from '@jefiozie/rss';

// THIS ONE IS WORKING
// import * as jb from './dist/libs/rss';

// SET CONFIG
// setPluginConfig(jb.BASEHREFREWRITE, { href: 'a' });
const postRenderers = [MinifyHtml];

const minifyHtmlOptions = {
  removeComments: false,
};

const SitemapPlugin = getSitemapPlugin();
setPluginConfig(SitemapPlugin, {
  urlPrefix: 'https://jefiozie.github.io',
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
  // defaultPostRenderers:[jb.BASEHREFREWRITE],
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
