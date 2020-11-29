---
title: "How I've automated our community website"
date: '2020-05-11'
tags:
  - angular
  - scully
  - automation
  - showdev
published: false
slugs:
  - ___UNPUBLISHED___kh59u7xj_tCJmf2EgN9NlSNPWCMzyNtg1rssBEwhV
---

# How I've automated our community website 
Last year I've joined the Dutch Angular Group as an Organizer and I can say I love it! 💖
Before I'm starting with my blog post I would like to give a shoutout to my fellow co-organizers and especially the founder of the Dutch Angular Group [Sander Elias][sander]. Thank you for letting me be a part of the DAG Community and have the privilege to help, show and organize great events where people can learn 🙏🏻

# How it all started

As a community group, we have had a custom domain name for several years, but in the last couple of years, we have never used it. Since the first beta of Scully, I've built a couple of POC and my blog with it. Based on my experience there I thought why not build something where our community can go, look at the schedule, have some general information about our group, and see our Code of Conduct.

This is where my journey with a community website started, but this is not the place where I thought about automation.

# When did we start to automate tasks

When I started with the organization of the DAG events, I didn't know anything about how to organize something, where to start, did we need a monthly schedule? All these things were new for me so with our organizer's team we just started by planning _one_ event. But, then came COVID-19, so we needed to adjust to the regulation, we quickly adopted a streaming service what we could use to do our first online session. It was a great adventure and I just made some quick Artwork for the announcements on our Meetup group. I have to say, I was pretty excited, my first organized event with two GDE's! 😎
It went great! 

# Let's automate things

After organizing 5 events, It occurred to me that I needed to do a repetitive task like every week for an event. Create an event, make artwork, twitter announcements, extra Twitter messages, etc.

Last week I had some spare time and I thought let's see If I could automate some stuff so that I have less work to do for the organization.
## How did we do this

Scully is a static site generator that will convert a normal Angular app to a static website within our case NO javascript. When we've had the idea to build this one of the requirements was to have our Meetup calendar place on our website. As Scully has a really easy and great way to create custom plugins, we've created a Meetup plugin that will look at your Meetup group and will get all the 100 latest events. With these 100 events, it will generate all these events in a specific way that we can use statically in our website.

When we've had all these things in place the only missing part was to automate the deployment process. As Github has a great set of Actions to assist you we've used one of these to deploy our static content, how ever Github Actions does nothing without a trigger. Looking at our automation part we thought could we trigger a Github action by doing an HTTP request? And we found out that this is supported by Github Actions, you just need to add the following snippet to your Github workflow:

```yml
on:
  repository_dispatch:
    types:
      - A EVENT NAME
```

By using Zapier we could now do a POST request to Github Actions to trigger our generation and deployment of our community website without doing any manual changes! If you would like to know about this specific part of Github Action, [click here][repodispatch]

![Preview of Meetup deployment automation](./assets/zapier_meetup_event.png)

# Thank you

Thank you for reading this post, feel free to DM me on [Twitter][@jefiozie]

[sander]: https://twitter.com/esosanderelias
[repodispatch]: https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows#repository_dispatch
[@jefiozie]: https://twitter.com/jefiozie
