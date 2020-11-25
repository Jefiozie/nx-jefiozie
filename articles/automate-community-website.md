---
title: "How I've automated our Scully community website"
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

Last year I've joined the Dutch Angular Group as an Organizer and I can say I love it! 💖
Before I'm starting with my blog post I would like to give a shoutout to my fellow co-organizers and especially the founder of the Dutch Angular Group [Sander Elias][sander]. Thank you for letting me be a part of the DAG Community and have the privilege to help, show and organize great events where people can learn 🙏🏻

# How it all started

As a community group we have had a custom domain name for several years, but the last couple of years we never used it. Since the first beta's of Scully, I've build a couple POC and my personal blog with it. Based on my experience their I thought why not build something where our community can go, look at the schedule, have some general information about our group and see our Code of Conduct.

This is where my journey with a community website started, but this is not the place where I thought about the automation.

# When did we started automate tasks

When I started with the organization of the DAG events, I didn't know anything how to organize something, where to start, did we need like a monthly schedule? All these things where new for me so with our organizers team we just started by planning _one_ event. But, then came COVID-19, so we needed to adjust to the regulation, we quickly adopted a streaming service what we could use to do our first online session. It was a great adventure and I just made some quick Artwork for the announcements on our Meetup group. I have to say, I was pretty excited, my first organized event with two GDE's! 😎
It went great, but I've seen some thing that I could do better for the next time.

## Artwork

Before I started a journey for new speakers I talked to a friend of my how is a designer (twitter donny) and asked him for a favor. Could you help me by making some artwork for our meetup group that I can use as a announcement picture. I think within 2 days he created three different versions and we (DAG) have our standard artwork for our online show and announcements

# Let's automate things

After organizing 5 events, It occurred to me that I needed to do repeated task like every week for a event. Create an event, make artwork, twitter announcements, extra twitter message, etc. etc.

Last week I had some spare time and I thought let's see If I could automate some stuff so that I have less work to do for the organization.

## The first step:

I started by creating an [Calendly]() where speakers could select a specific date/time when they could present there talk.
As you may know Calendly can intergrate with your calendar, when an event is placed in the calendly agenda it will put a new event in my calendar. This way I know for sure that I didn't have other things to do on the same time.
# What does this have to do with a communtiy website?

In the first chapter of this article you already have read that we've build a community website with Scully. The cool thing about this journey in automation is that our Community website is also automated to deploy a new version our of Static Site to Github pages when a new event is scheduled 😎

## How did we do this

Scully is a static site generator that will convert a normal Angular app to a static website with in our case NO javascript. When we've had the idea to build this one of the requirements was to have our Meetup calendar place on our website. As Scully has a really easy and great way to create custom plugins, we've created a Meetup plugin that will look at your Meetup group and will get all the 100 latest events. With these 100 events it will generate all these events in a specific way that we can use it statically in our website.

When we've had all these things in place the only missing part was to automate the deployment process. As Github has a great set of Actions to assist you we've used one of these to deploy our static concent, how ever Github Actions does nothing without a trigger. Looking at our automation part we thought could we trigger a Github action by doing a HTTP request? And we found out that this is supported by Github Actions, you just need to add the following snippet to your Github workflow:

```yml
on:
  repository_dispatch:
    types:
      - A EVENT NAME
```

By using Zapier we could now do a POST request to Github Actions to trigger our generation and deployment of our community website without doing any manual changes! If you would like to know about this specific part of Github Action, [click here][repodispatch]

![Preview of Meetup deployment automation](./assets/zapier_meetup_event.png)

# Thank you

Thank you for reading this post

[sander]: https://twitter.com/esosanderelias
[repodispatch]: https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows#repository_dispatch
[@jefiozie]: https://twitter.com/jefiozie
