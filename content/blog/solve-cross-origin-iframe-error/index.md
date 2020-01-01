---
title: 'Solve the Cross-Origin Access error when working with iframes'
date: '2020-01-01'
---
As most of you would know, the [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) or inline frame element allows you to embed one HTML page into another. 

Sites like YouTube and Google Maps use iframes to embed thier content in your website. 

While embedding an `iframe` is pretty straightforward, customising the document inside the iframe is not that simple. 

This post will breifly explain the Cross-Origin access problem that is faced when accesing an `iframe` document and how you can setup your development environment to overcome this problem.

# iframe Security 101
While `iframe` is a very powerful tool, it essentially means that you are running some arbitary code, loaded from a remote server (which you may or may not control) on your app and exposing your users to it. Naturally, this also means that one has to be very careful about security. 

All Browsers implement a Cross-Origin Access Restriction to prevent the host document from accessing the `iframe` document, **unless** they have the same _origin_. This is done to prevent embedded documents access to your sites cookies, localStorage data etc.

## What is origin?
Origin of a document is a combination of its protocol (http, https), domain & port. 

# Accessing an iframe document.
Now, lets say that your host app is at `https://your-awesome.app` and the iframe loads a document from `https://your-awesome.app/embed?id=123`. 

When the user clicks a button, we want to inject some styles into the document of the iframe.

```
<iframe src="https://your-awesome.app/embed/123" id="my-frame"></iframe>

// some functionality to inject CSS
<script>
  function injectStyles(styleTag){
     const iframe = document.getElementById("my-frame");
     const embed = iframe.contentDocument;
     embed.head.appendChild(styleTag);
  }
</script>
```

Since both your app and the `iframe` have the same origin (https://your-awesome.app), the browser will let you access the `contentDocument`.

## Local development challenges
When developing locally, your app URL mostly looks like `localhost:3000`, `localhost:5000` etc. Now, assuming that embed service will still be loaded from the remote server, the above code will show you an error while looks something like 
```
SecurityError: Blocked a frame with origin "http://www.<domain>.com" from accessing a cross-origin frame.
```
This error is very straightforward to understand, when developing locally, your origin is `http://localhost:3000` while the iframes origin is still `https://your-awesome.app`. 

The solution to this problem is to somehow serve your local app and the iframe under the same origin, this will involve a couple of things -

 1. Serve our local app under `local-dev.your-awesome.app`
 2. Serve the iframe from `local-dev.your-awesome.app/embed`

# Setup local domain
What we want is that when we goto `local-dev.your-awesome.app` from our browser, it should load our app which is serving at `localhost:3000` , for this, we will update the `hosts` file.

```
$ nano /etc/hosts
# add the following line to the end of the hosts file
127.0.0.1 local-dev.your-awesome.app

# Leave an empty line at the end of the file, it is required.
```

_Note:_ On Windows, the hosts file can found at `c:\Windows\System32\Drivers\etc\hosts`

Through this one line, we have told our machine that any request to `local-dev.your-awesome.app` should be sent to our localhost. 

Now, when you go to the URL in your browser, it still won't load our app. This is because our app is being served at port 3000, while the redirect is going to the default port(80). 
We need to setup a proxy to send requests from `/` to `localhost:3000`. To do this, you can use a nifty tool I found called [proxrox](https://github.com/bripkens/proxrox). Proxrox essentially spins up an Nginx instance with some custom configuration. This is what our proxrox configuration look like - 

```
## .proxrox.yaml
proxy:
  "/":  "http://localhost:3000"
```

You can start proxrox with the config - `proxrox start .proxrox.yaml`

When you go to `local-dev.your-awesome.app`, you should see your app being served.

This magic happens becuase proxrox configures a `proxy_pass` in nginx for us which takes all requests going to `/` and passes it to our app at `localhost:3000`

# Setup proxy for iframe document
Now that our app is running at `local-dev.your-awesome.app`,  we just need to get the embeds to serve at `/embed`. To do this, edit your `.proxrox.yaml` file again and add the following configuration - 

```
proxy:
  "/":  "http://localhost:3000"
  "/embed": "https://your-awesome.app/embed/"
```

Save the config and restart proxrox.

Update your frame `src` attribute - 

`<iframe src="/embed/123"></iframe>`

Since the document and the embedded document both are being served from `local-dev.your-awesome.app`, you will no longer face the cross origin access error when trying to access the iframe.

This also gives you access to the iframe document, which means that you can insert scripts, styles and even listen to & send messages to the document.

