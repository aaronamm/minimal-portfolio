---
layout: post
activity: How to Install Google Chrome on Debian
description: Installation instuction by using Google repository, and troubleshooting a error of public key is not available.
tags: [debian, chrome, repository, how-to, install, apt-key, chromium]
categories: [en]
---

# *Deprecated post!
Please go to [my new post]({{ /posts/2016-11-21-a-very-short-ubuntu-debian-packages-installation/ | url }}#google-chrome). 

<hr>

## Prerequisite
- chromium via `$ sudo aptitude install chromium`

## Installation
1. Add Google Chrome repository from [unofficial debian repository](https://wiki.debian.org/UnofficialRepositories) by add `deb http://dl.google.com/linux/chrome/deb/ stable main` into last line of `/etc/apt/source.list`
    
    ```bash
    $ sudo echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/source.list
    $ sudo aptitude update
    ```

2. If you got the error look like this

    ```
    W: GPG error: http://dl.google.com stable Release: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY A040830F7FAC5991
    ```
    It means your public key (In my case, (`A040830F7FAC5991` is my public key) can't verify. Use the belowing command to sign & trust the new repository from google. using ` $ sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys [Your public KEY]`

    *example*

    ```
    $ sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys A040830F7FAC5991
    ```

3. It's time to Install Google Chrome!

    ```
    $ sudo aptitude update
    $ sudo aptitude install google-chrome-stable 
    ```
    
> Note: Google Chrome has 3 version: `google-chrome-beta`, `google-chrome-stable` and `google-chrome-unstable`. My case uses `google-chrome-stable` for daily use.

