---
title: 'Deploy your Angular app with Scully and Cloudflare Pages'
description: 'Deploy your Angular app with Scully and Cloudflare Pages'
date: '2021-03-15'
tags:
    - angular
    - scully
    - cloudflare
    - showdev
published: true
---

In this article, we will introduce you to Scully and explain how to deploy your Angular app with Scully to Cloudflare pages.
This article is for people who are interested in setting up a JAMstack app with Angular, Scully, and Cloudflare pages.

<pre>
 ❗ Pre-requisites ❗
 
- You should have some basic knowledge of Angular
- You should have a Cloudflare account
- You should have a Github account
</pre>

# What is Cloudflare pages

Cloudflare Pages is the solution for people that use JAMstack frameworks. Cloudflare Pages easily integrates with Github in a way that when you push a new version, Cloudflare automatically starts building and deploying your app on its network.

If you’re not familiar with JAMstack, it’s a popular way of developing and deploying websites at scale. You can look at this resource for more information about the JAMstack [link][jamstack]

Coming back to Cloudflare Pages, as we said earlier it integrates with GitHub repositories if you’re hosting your source code on that platform. Once your site is configured, you can preview each commit from Cloudflare’s interface — each commit gets a unique URL and there’s a preview environment.

You can collaborate with other Cloudflare users by inviting them to your Pages project. When your site looks good in the preview branch, you can push it to the production branch.

So in summary, Cloudflare Pages lets you easily deploy your app without any hustle.

# Setup your Angular app with Scully

Before we set up our Angular app, let's have a quick look at Scully.

Scully is the best static site generator for Angular projects looking to embrace the JAMstack.
It will use your application and will create a static `index.html` for each of your pages/routes. Every `index.html` will have the content already there, and this will make your application show instantly for the user. Also, this will make your application very SEO-friendly. On top of this, your SPA will still function as it did before.
A big advance of Scully is that it has an easy-to-use and extendible plugins system that will allow you to manipulate routes and content.

For this article, we will set up a really simple app, just so we can learn about Cloudflare Pages.

Before we are get started, go to Github and create a new repo, you can also go to `https://repo.new` this is an easy way to create a new repository at Github.

Clone the repo to your local machine, now let's continue by setting up a new Angular project.

```bash
npm install -g @angular/cli
ng new <YOUR-PROJECT-NAME> --routing
```

By running the command above we will be provided with a simple Angular app with a router module. When the Angular CLI is finished, we will have a fresh Angular workspace, with a pre-filled demo Angular app.

Let's continue by adding Scully, the Scully team has made this easy for us, we only need to run the following command:

```bash
ng add @scullyio/init

--- output should be something like below ---

Installing packages for tooling via npm.
Installed packages for tooling via npm.
    Install ng-lib
    ✅️ Added dependency
UPDATE src/app/app.module.ts (466 bytes)
UPDATE src/polyfills.ts (3019 bytes)
UPDATE package.json (1310 bytes)
- Installing packages (npm)...
√ Packages installed successfully.
    ✅️ Update package.json
    ✅️ Created scully configuration file in scully.demo-cloudflare-pages.confts
CREATE scully.demo-cloudflare-pages.config.ts (196 bytes)
UPDATE package.json (1384 bytes)
CREATE scully/tsconfig.json (450 bytes)
CREATE scully/plugins/plugin.ts (305 bytes)
```

We are now ready to use Scully with Angular, to do this we first need to build the Angular project. This can be done by running:

```bash
ng build --prod
```

Now that the Angular project is built, Scully can do its work. Run Scully with the following command:

```bash
npx scully
```

We did it! We turned your Angular app into a pre-rendered static site, we can now push our changes to our Github repo.

# Setup your repository for Cloudflare pages

We are now ready to connect or freshly created app with Cloudflare pages. 

1. Go to your Cloudflare account
2. On the right, click on Pages

![Preview of Cloudflare menu](./assets/cloudflare/cloudflare_menu.png)

3. Click on "Create a project"

![Preview of Cloudflare Create a project](./assets/cloudflare/cloudflare_create_project.png)

4. Connect your Github account

![Preview of Connect Github](./assets/cloudflare/connect_github.png)

5. When you successfully connected to Github, you can choose a repository. In our example, I'm selecting `demo-cloudflare-pages`

6. After selecting the project, click on **Begin Setup**

7. Scroll to *Build Settings* and fill in the same setting as the picture below

![Preview of Build settings](./assets/cloudflare/build_settings.png)

8. CLick on *Deploy*
9. Cloudflare will start working on building your app, this will fail, this is intended, don't worry we will fix it in the next chapter.

# Deploy it with Cloudflare pages

We are almost ready to deploy our app, in the previous part we configured everything to be ready for deployment. But we still need to tweak a couple of things before we can use Cloudflare pages. So let's make these changes!

1. Open your package.json file and add the following snippet to the `scripts`:

```json
    "buildStaticApp": "ng build --prod && npx scully --scanRoutes"
```
2. Open up your scully configuration file, in our case `scully.demo-cloudflare-pages.config.ts`
3. Add the following snippet to the configuration:

```json
puppeteerLaunchOptions: {
    args: [
      '--disable-gpu',
      '--renderer',
      '--no-sandbox',
      '--no-service-autorun',
      '--no-experiments',
      '--no-default-browser-check',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-extensions',
    ],
  }
```

These changes are needed as Cloudflare runs in a VM or Docker, and we cannot have a "real" chromium spin up. This way we make sure that the bare minimum is enabled for puppeteer so that it can run in the VM or Docker.

4. Now commit and push the changes to the Github repo

5. Cloudflare will automatically pick up the changes, let's go back to our Cloudflare project and we will see it is building our app:

![Preview of Build settings](./assets/cloudflare/cloudflare_building.png)

6. If everything goes well, we have successfully deployed our app!! 

![Preview of Build settings](./assets/cloudflare/cloudflare_deploy.png)

# Summary

In this article, we have made our Angular app a JAMstack app with the help of Scully and deployed it with Cloudflare pages! Below are some resources that I found helpful when using Cloudflare pages and Scully. You can find the example repo [here][repo].

If you have any questions send me DM via my twitter profile [@jefiozie][@jefiozie]
 
# Resources

- [Repository][repo]
- [Scully][scully]
- [Cloudflare Pages][cloudflarepages]

[@jefiozie]: https://twitter.com/jefiozie
[repo]: https://github.com/Jefiozie/demo-cloudflare-pages
[scully]: https://scully.io/
[cloudflarepages]: https://pages.cloudflare.com/
[jamstack]: https://Jamstack.org/
