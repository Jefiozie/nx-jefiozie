---
title: '#TIL: Working with NX'
date: '2019-01-14'
tags: ['angular', 'NX']
published: true
---

Today I upgraded one of our application to the most recent version NX. The upgrade itself was challenging as we are on a older version of NX. But after a couple of hours fixing some problems we where running on version `7.1.1`.

When using the old way of running the test we could use to following command to run **all** tests:

```bash
$ npm run test
or
$ yarn test
```

After the upgrade this didn't work anymore. Looking at issue [#514](https://github.com/nrwl/nx/issues/514) made some things clear. Below I have listed some example that where documented by _Viktor Savkin_

- Running one project

```bash
 $ ng test myproject
```

- Run all projects using affected:\*, like this:

```bash
$ yarn affected:test --files=package.json
```

- Test only that what is affected by your change:

```bash
$ yarn affected:test --base=master --head=HEAD
```

- Doing the same in parallel:

```bash
$ yarn affected:test --base=master --head=HEAD --parallel
```
