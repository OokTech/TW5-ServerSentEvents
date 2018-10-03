/*\
title: $:/plugins/OokTech/ServerSentEvents/ServerSentEventsDemoNode.js
type: application/javascript
module-type: startup

This is just here as a demo of how the server sent events work.
It can be used as a reference to make plugins or other modules that use them.

This is for the server side

It sends a message to make a new tiddler every second. The title is 'Server
Sent Events Demo' and the text field is the current time.

\*/
(function () {

  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  // Export name and synchronous status
  exports.name = "server-sent-events-demo";
  exports.platforms = ["node"];
  //exports.after = ["boot"];
  exports.synchronous = true;

  exports.startup = function() {
    setInterval(function() {
      var timestamp = (new Date()).toLocaleTimeString();
      var fields = {title: 'Server Sent Events Demo', text: timestamp};
      var message = {type: 'newTiddler', param: fields}
      $tw.SendSSE('newTiddler', message);
    }, 1000)
  }
})();
