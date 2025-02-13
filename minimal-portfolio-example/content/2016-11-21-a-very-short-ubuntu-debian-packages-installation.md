---
layout: post
activity: "A very short Ubuntu/Debian packages installation sheet"
categories: [en]
tags: [ubuntu, debian, ppa, chrome, docker, vscode, zotero]
featured: true
toc: true
---

## Docker

- [Install on Ubuntu](https://docs.docker.com/engine/installation/linux/ubuntulinux/)
- [Install on Debian](https://docs.docker.com/engine/installation/linux/debian/)

## Google Chrome

```bash
$ wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
$ echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' | sudo tee /etc/apt/sources.list.d/google-chrome.list
$ sudo apt update
$ sudo apt install google-chrome-stable 
```

Reference: <https://www.google.com/linuxrepositories/>

## Visual Studio Code

```bash
$ sudo wget -O - https://tagplus5.github.io/vscode-ppa/ubuntu/gpg.key | sudo apt-key add -
$ sudo wget -O /etc/apt/sources.list.d/vscode.list https://tagplus5.github.io/vscode-ppa/ubuntu/vscode.list
$ sudo apt update
$ sudo apt install code
```

Reference: <https://github.com/tagplus5/vscode-ppa>

## Zotero Standalone

```bash
$ sudo apt install software-properties-common
$ sudo add-apt-repository ppa:smathot/cogscinl
$ sudo apt-get update
$ sudo apt-get install zotero-standalone
```

