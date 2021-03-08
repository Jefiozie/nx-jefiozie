---
title: 'Angular CLI Builders'
description: 'Create a Custom Angular CLI Builder'
date: '2021-03-08'
tags:
    - angular
    - builders
    - cli
    - showdev
published: false
slugs:
    - ___UNPUBLISHED___km11cdi7_aM9aIMIUNqmPZwbQSvznhodCmzToqjeA
---

In this post, we will try to explain the basics theory around the Angular CLI builders and how you can build a Custom Builder. How to build a Custom Builder will be done based on a builder we've created with a very general use case, Image Optimization.

# History

Back in the day, before Angular CLI version 8 the supported method to `customize` the Angular CLI was `ng eject`. When using this command we would say against the Angular CLI that we as developers would handle the configuration. Maybe you didn't know but under the hood of the Angular CLI is using w`Webpack. So when we did run the command the Angular CLI would `eject` the Webpack configuration to a file that we can change. Of course, this works, but you needed to know how and what to exactly change for your needs and the Webpack can be (in my opinion) a bit overwhelming when you look at it.


# The Angular CLI today

As mentioned in the `History` of the Angular CLI when writing this post we are at version 11 and a lot has been changed. The `ng eject` command is removed from the Angular CLI. Since Angular CLI version 8 something new has made its place. This new part is called the *Builders* API. The Builders API makes it easy to extend general parts like `ng build`, `ng serve`, or make a custom CLI command like `ng run mybuilder:app`.


# The builders we use today, every day!

Did you ever wondered what is happening when we use `ng build` or `ng serve`? Basically, the Angular CLI will start a new task based on the `angular.json` file. 
First, it will examine the `angular.json` looking for the project, in a single app set up this will be always the default application. 

image

When this project has been found, it will look at the target, in our example, this target is `build`.

image

Now the Angular CLI knows enough to execute the builder! 
Below I've made a simple table that shows what builders are represented with a default Angular CLI command:

| Command  | Builder  |
|---|---|
| build  | Browser builder |
| serve  | Dev-Server builder |
| test  | Karma builder  |
| lint | TSLint builder  |
| e2e| Protractor   |

# So what is a builder then

Before I'm going to provide you with my explanation of builders, let's have a look at the docs.

```
A number of Angular CLI commands run a complex process on your code, such as linting, building, or testing.
The commands use an internal tool called Architect to run CLI builders, which apply another tool to accomplish the desired task. 
With Angular version 8, the CLI Builder API is stable and available to developers who want to customize the Angular CLI by adding or modifying commands. 
For example, you could supply a builder to perform an entirely new task or to change which third-party tool is used by an existing command.
```

After reading this I made the following conclusion: 
>*An Angular CLI builder Is just a function that is when called, executing a task (or multiple). The Angular CLI is having an internal task-based system called Architect. This task-based system is responsible for delegating work to the builder(s)* 

For me, this made it easy in my mind to link specific commands to tasks and know that they are executed with specific commands provided by the Angular CLI.

 
# How to create a custom builder?

Now that we've come to the part where we are going to look at the custom builder we first need to set up the project structure.
Below a couple of minimal steps we need to take before we can continue with our builder: 

1. Npm init
2. Git init
3. Add dependencies (minimal needed):
 - Typescript
 - @angular-devkit/architect
4. Add some npm scripts for building and testing our package
5. Add a “builder.json” file
6. Add "builders": "builders.json" to your package.json
7. Add an “index.ts” file

Our project structure is complete, now we need to make the `Builder`. The Angular CLI team has provided an easy way to connect our custom builder so that it can be executed with the Angular CLI. We need to import the `createBuilder` function. The `createBuilder` function is actually hooking up the task-based system from within the Angular CLI and lets you use your custom builder.

```ts
import { createBuilder, BuilderContext, BuilderOutput } from '@angular-devkit/architect'

// Schema Options
interface Options extends JsonObject {...}

// Our func. that is executed by the tasked based system
function customBuilderFunc(
  options: Options,
  context: BuilderContext,
  ): Promise<BuilderOutput> {
    // logging the message
    context.reportStatus(`Executing Custom Builder`);
    return new Promise(resolve => {
        // log message when we are done
      context.reportStatus(`Done running Custom Builder 🎉`);
    });
}

export default createBuilder(customBuilderFunc);
```











