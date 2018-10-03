# Server Sent Events Prototype for TiddlyWiki

## How to use this demo

1. Clone the repo into your plugins folder
2. Add the plugin to the tiddlywiki.info file (the plugin is
  `OokTech/ServerSentEvents`)
3. Start the wiki using the command `--serverevents`, it is a clone of
  `--server` with all the same parameters.
4. Open the wiki, a tiddler called `Server Sent Events Demo` should be created
  with the text field updated with the current time by the server using server
  sent events.

## How to extend this

Look at `ServerSentEventsDemoNode.js` and `ServerSentEventsDemoBrowser.js` in
this repo for examples.

To extend this you have to make two components. The first is the server side
component that sends a message to the browser and the second is the handler in
the browser.

The in-browser part uses the established hooks mechanism with the hook called
`th-server-sent-event`. The hook is passed two parameters, the name of the
event (defined by the server) which must be a string and the parameter for the
event which is a JSON object.

The server side is a bit less polished. For now you use global function
`$tw.SendSSE(eventType, data)` where `eventType` is a string that gives the
event a name and `data` is a JSON object. The function is available anywhere
you have access to `$tw` so it can be used in plugins.

So you make something on the server that sends a message with a message type
and then in the browser you make a handler for that message type using hooks.

It is nicely extensible but I am unhappy with the server side.

## Concerns

This plugin is a prototype to add server sent events to tiddlywiki. There are a
few issues to work out before a pull request into the core:

1. Where to put the events stream route. Right now it is just smashed into the
  server command.
2. How to access the events stream on the server side. Right now it is by a
  globally available function. This may be the best we can do but I think it
  is inelegant compared to how nice the hooks mechanism is in the browser.
3. There isn't a way to address just one of the connected browsers (this may
  not be a problem)
4. Is it ok that this doesn't use the normal event types?
  - Normally SSEs can have an event type to go with the message. The problem is
    that each event type requires its own handler function because javascript
    doesn't have a wildcard event handler. If we used the normal method of
    setting an event type than we would not be able to use tiddlywiki hooks to
    set up handlers.
