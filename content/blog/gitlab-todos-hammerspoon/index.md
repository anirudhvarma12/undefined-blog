---
title: 'Tracking GitLab Todos with Hammerspoon'
date: '2020-08-23'
---

At [SpotDraft](https://spotdraft.com) we use self-hosted [GitLab](https://gitlab.com) to host our source code and manage projects. One nice concept that GitLab uses is that of **Todos**. A Todo is created anytime an issue is assigned to you, a Merge Request requires your review or someone mentions you in a comment, hence the Todos page serves as a hub for you to figure out what you can help with or what you can work on next.

![Gitlab Todo Menu](./gitlab-todo-menubar.png)

So, to keep on top of my todos, without having to open GitLab all the time, I created a little [Hammerspoon](https://www.hammerspoon.org/) script that simply keeps the count of todos in my MacOS menu bar. For those who are not familiar with Hammerspoon, it is a MacOS automation that makes it super easy to interact with the operating system using a Lua Scripting Engine.

## The Code

I have never written a single line of Lua in my life before, but even then thanks to great documentation by Hammerspoon and the set of extensions already available, it did not take long to make this functional _"app"_

After installing Hammerspoon, open your `init.lua` file and add the following

```lua
-- URL to open when the menu bar is clicked
local MENUBAR_CLICK_URL = "https://gitlab.com/dashboard/todos";
-- GitLab access token to make the API call
local GITLAB_TOKEN = "<Your Token>"
-- TODOs API URL
local GITLAB_TODO_API = "https://gitlab.com/api/v4/todos"
local POLL_INTERVAL_MINUTES = 15

function onMenuClick()
    hs.urlevent.openURL(MENUBAR_CLICK_URL)
end

gl_menu = hs.menubar.new()
gl_menu:setClickCallback(onMenuClick)

function updateMenuBar(todos)
    counter = 0
    for index in pairs(todos) do
        counter = counter + 1
    end
    gl_menu:setTitle("Gitlab Todos - "..counter)
end

function callGitLab ()
    headers = {}
    headers["PRIVATE-TOKEN"]=GITLAB_TOKEN
    gl_menu:setTitle("Fetching Todos...")
    hs.http.asyncGet(GITLAB_TODO_API, headers, function(status, data)
        todos = hs.json.decode(data)
        updateMenuBar(todos)
    end)
end

hs.hotkey.bind({"cmd", "alt", "ctrl"}, "G", function()
    callGitLab()
end)

hs.timer.doEvery(POLL_INTERVAL_MINUTES*60, callGitLab)

callGitLab()
```

The code (IMO) is quite straightforward -

- We have a function `callGitLab`, that calls an API call to fetch the Todos and update the menubar when it is loaded.
- We set this function to refresh data every 15 minutes.
- We create a hotkey combination to manually refresh.

I have been looking at Hammerspoon to build something for sometime now, and this does not even scratch the surface of whats possible.

- Credits to [Shantanu Goel](https://shantanugoel.com/) who built some cool things with Hammerspoon and his [latest post](https://shantanugoel.com/2020/08/21/hammerspoon-multiscreen-window-layout-macos/) gave me the idea (& motivation) to build this.
- Also, [Just enough Lua to be productive in Hammerspoon](https://zzamboni.org/post/just-enough-lua-to-be-productive-in-hammerspoon-part-1/) is a good series for someone who has no prior experience with Lua
