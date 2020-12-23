# ⌚ scully-plugin-time-to-read 📖

The `scully-plugin-time-to-read` is a `routeProcess` plugin for [Scully](http://scully.io/) that processes a specific route and will add the 'readingTime' property to the `RouteData. This property reflects the time that people need to read the content.

This plugin is designed (and tested) to work with the blog schematic and the contentFolder plugin. 
## 📦 Installation

To install this plugin with `npm` run

```
$ npm install scully-plugin-time-to-read --save-dev
```

## Usage
This package heavly rely on the scully blog schematics with markdown support.

1. Open you scully configuration file (below is an example).

```typescript
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
    },
  },
};

```
2. Add the folowing configuration to your scully config before you scully config.

```typescript
// scully.config.ts
setPluginConfig(timeToRead, {
  path: '<THE PATH TO YOUR ROUTES>'
} as timeToReadOptions);

```
3. Change the path to your own path, this path property will be used to check the routes that are handled by scully. In our example we should put `/articles/article/` in it. This way we know for sure that only our "blog" articles are being used by the plugin.
4. Now the plugin should work, run `scully --scanRoutes` and check the `scully-routes.json` file. Here we should see a extra property like in the example below.

```json
 {
        "route": "/blog/2020-12-21-blog",
        "title": "2020-12-21-blog",
        "description": "blog description",
        "published": true,
        "sourceFile": "2020-12-21-blog.md",
  --->  "readingTime": 1
    },
```
5. You can now use the `RouteData` and get the `readingTime` property in your component. This can be done by using the `ScullyRoutesService` and pass the route with data to your component. Below a example of how you can use the `readingTime` property in your component.

```html
      <mat-card-subtitle>
        Date: {{ route?.data?.date | date: 'dd-MM-yyyy' }} - {{ route?.data?.readingTime | number:'1.0-0'}} min read
      </mat-card-subtitle>
```

