---
title: NES
slug: NES
description: An NES emulator with cartridge ROM support
date: 12-19-2023
languages:
  - Rust
  - C++
code: https://github.com/arm-out/NES
live:
---

![NES header](images/NES/header.jpg)

This is an emulator of the classic [NES console](https://en.wikipedia.org/wiki/Nintendo_Entertainment_System) that is able to play ROMs of most of the classic games like Super Maro Bros, PacMan, Donkey Kong etc.

Initially having written this in [C++](https://github.com/arm-out/NESEmulatorC) this rewrite enabled me to have a deeper understanding of writing large programs in Rust by reimplementing the most complex project I've ever made.

Doing the research for this made me have a deeper appreciation and understanding of programming techniques game developers used inorder to pack as much functionality and complexity in to games given the limitations of the 6502 CPU and program ROM sizes
