---
title: armn.link
slug: armn-link
description: A personal URL shortener
date: 08-13-2024
languages:
  - Svelte
  - SQLite
code: https://github.com/arm-out/armn.link
live: https://armn.link
---

![armn-link header image](images/armn-link/header.png)

armn.link is a URL shortener that was created for the sole purpose of creating short shareable links to projects/blog posts

Since the links are meant to be accessed from anywhere in the world without significant load times, it is deployed on the edge network using [Cloudflare Workers](https://workers.cloudflare.com/) and [Turso](https://turso.tech/), an edge-replicated libSQL database platform.
