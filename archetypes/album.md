---
title: "{{ replace .Name "-" " " | strings.FirstUpper }}"
description: ""
date: {{ .Date }}
categories: ["Photos"]
tags: []
draft: true
---

{{< gallery >}}
{{< /gallery >}}
