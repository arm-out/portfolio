---
title: habit
slug: habit
description: A daily habit tracking social network powered by social accountability
date: 03-06-2024
languages:
  - Svelte
  - Typescript
  - PostgreSQL
code: https://github.com/arm-out/habit
live: https://habitsnap.vercel.app/
---

![habit header](images/habit/header.png)

habit was created as a way for my friends and I to keep ourselves accountable for going to the gym. The main premise of the app was everyday, everyone in the group would get a notification to send a picture of them at the gym/whatever habit they wanted to track and be held accountable.

This was a PWA made with Svelte, using [Supabase](https://supabase.com/) as for auth into different groups/habits and using their Postgres databse to optimize images and deliver monthly leaderboard statistics.
