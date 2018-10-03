/*\
title: $:/plugins/OokTech/ServerSentEvents/ServerSentEventsDemoBrowser.js
type: application/javascript
module-type: startup

This is just here as a demo of how the server sent events work.
It can be used as a reference to make plugins or other modules that use them.

This is for the browser side

It sends a message to make a new tiddler every second. The title is 'Server
Sent Events Demo' and the text field is the current time.

\*/
(function () {

  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  // Export name and synchronous status
  exports.name = "server-sent-events-demo";
  exports.platforms = ["browser"];
  //exports.after = ["boot"];
  exports.synchronous = true;

  exports.startup = function() {
    $tw.hooks.addHook('th-server-sent-event', function(type, param) {
      if (type === 'newTiddler') {
        console.log(param)
        $tw.wiki.addTiddler(new $tw.Tiddler(param));
      }
    })
  }
})();
