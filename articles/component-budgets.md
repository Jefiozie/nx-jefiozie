---
title: 'A new type of Angular budget on the block'
date: '2020-03-10T13:40:16'
description: We will look at the new budget that is added on the Angular CLI.
tags: 
 - Angular
 - CSS
 - Angular CLI

---


Before we are going to look at the new budget that recently has been added to the Angular CLI, let's do a small recap on what budgets are.

## What are Angular Budgets?

The official [documentation](https://angular.io/guide/build#configure-size-budgets) says:

> As applications grow in functionality, they also grow in size. The CLI allows you to set size thresholds in your configuration to ensure that parts of your application stay within size boundaries that you define.

In other words, bundles are the set of compiled JavaScript files, which are produced by the build process. Angular Budgets allow us to set a threshold around the size of these bundles. With the help of Angular Budgets, we can easily define a condition where we would expect a warning or error threshold if the size of a bundle increases. When an error is provided our build will fail with a bundle error.


## The new type of budget on the block:

With the release of Angular CLI version 9.x, a new budget type was introduced. This type is being called the [`anyComponentStyle`][Anycomponent_budget]

## How will this budget help me?

Good question, when we develop an application (or library) our bundle sizes will increase. This is how the development lifecycle is and always will be. However, we like to have them as small as possible and that is where budgets come into play. Where the regular budgets will look at our JavaScript bundles, the `anyComponentStyle` will look at our **individual** component CSS files. 

Some interesting things to know about the rules that apply with this budget:

* The budget will throw a warning or an error if any component has styles bigger than the configured threshold, but it will **NOT** raise any warning or error if the global style is _HUGE_.
* The budget will **only** check individual components
* At this moment it only supports CSS but there is a [PR][PR_Sass] incoming to support other extensions as well.


## How is the new budget type defined

Previously, the `angular.json` contained a default budget rule like:
```json
"budgets": [
{
  "type": "initial",
  "maximumWarning": "2mb",
  "maximumError": "5mb"
}
]
```
When migrating to the new version of the Angular CLI, you will find a new budget added to the `angular.json`, which looks like:

```json
"budgets": [
{
  "type": "initial",
  "maximumWarning": "2mb",
  "maximumError": "5mb"
},
{
  "type": "anyComponentStyle",
  "maximumWarning": "6kb",
  "maximumError": "10kb"
}
]
```
This new definition is where you can set the constraints for a warning or error message when a component's CSS file is exceeding this size.

## Thank you!

I hope you enjoyed this article! I would appreciate if you would share this article to spread the word around this new cool budget!
Also big thanks for some great reviewers:

* [Frederik Prijck](https://twitter.com/frederikprijck)
* [Santosh Yadav](https://twitter.com/SantoshYadavDev)
* [Sam Vloeberghs](https://twitter.com/samvloeberghs)

Please, don’t hesitate to ping me if you have any questions around Angular via Twitter [@jefiozie][@jefiozie]. 


### _RESOURCES_

- [Angular CLI Builders][Angular_CLI_Builders]
- [Angular Budgets][Angular_Budgets]
- [PR for supporting Sass][PR_Sass]

[Angular_CLI_Builders]: https://angular.io/guide/cli-builder
[Angular_Budgets]: https://angular.io/guide/build#configuring-size-budgets
[PR_Sass]: https://github.com/angular/angular-cli/pull/17096
[Anycomponent_budget]:https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/build_angular/src/angular-cli-files/plugins/any-component-style-budget-checker.ts
[@jefiozie]: https://twitter.com/jefiozie
