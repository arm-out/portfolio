---
title: SuperSloMo
slug: SuperSloMo
description: ML pipeline to create super slow motion using frame interpolation
date: 01-03-2024
languages:
  - Python
code: https://github.com/arm-out/SuperSlowMo?tab=readme-ov-file
live:
---

![SuperSloMo header image](images/SuperSloMo/header.png)
<br>

An implementation of video frame interpolation as described in the wildy popular research of [Jing Et al.](https://arxiv.org/abs/1712.00080) using an end-to-end convolutional neural network for generating spatially and temporally coherent video sequences
<br>

The main idea is to compute bi-directional optical flows from two frames using a U-Net architecture and combining them to approximate immediate flows
<br>

The data was trained on the [adobe240fps](https://www.cs.ubc.ca/labs/imager/tr/2017/DeepVideoDeblurring/) dataset
