/*\
title: $:/plugins/OokTech/ServerSentEvents/ServerSentEventsHandler.js
type: application/javascript
module-type: startup

This sets up the server sent events handler.

It is extensible so other plugins can add their own events and handlers.

\*/
(function () {

	/*jslint node: true, browser: true */
	/*global $tw: false */
	"use strict";

	// Export name and synchronous status
	exports.name = "startup-actions";
	exports.platforms = ["browser"];
	exports.after = ["rootwidget"];
	exports.synchronous = true;

	exports.startup = function() {
		// Do all actions on startup.
	  var eventSource = new EventSource("/events");
    eventSource.onmessage = function(e) {
      try {
        var data = JSON.parse(e.data);
        var type = data.type
        var param = data.param
        $tw.hooks.invokeHook('th-server-sent-event', type, param);
      } catch (e) {
        console.log(e);
      }
    }
    /*
    $tw.registerServerEventHandler = function(name, handler) {
      if (typeof name === 'string' && typeof handler === 'function') {
        eventSource.addEventListener(name, handler, false);
      }
    }

    //
    $tw.registerServerEventHandler('newTiddler', function(e) {
      try {
        var fields = JSON.parse(e.data)
        $tw.wiki.addTiddler(new $tw.Tiddler(fields));
      } catch (e) {
        console.log(e)
      }
    })
    */
  }
})();
