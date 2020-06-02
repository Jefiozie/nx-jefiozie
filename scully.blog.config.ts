import { ScullyConfig, setMyConfig, setPluginConfig } from '@scullyio/scully';

// THIS ONE WILL FAIL
import * as jb from '@jefiozie/rss';


// THIS ONE IS WORKING
// import * as jb from './dist/libs/rss';

// SET CONFIG
setPluginConfig(jb.BASEHREFREWRITE, { href: 'a' });

export const config: ScullyConfig = {
  projectRoot: './apps/blog/src',
  projectName: 'blog',
  outDir: './dist/static',
  defaultPostRenderers:[jb.BASEHREFREWRITE],
  routes: {
    '/articles/article/:id': {
      type: 'contentFolder',
      id: {
        folder: './articles',
      },
    },
  },
};
