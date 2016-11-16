"use strict";

// constructor
var Pagehook = function() {
  this.definitions = {};
  this.handler = this.handlerUnbound.bind(this);
};

// constant
Pagehook.GLOBAL_HOOK_NAME = "@global";
Pagehook.ATTRIBUTE_NAME = "data-pagehook";

// static methods
Pagehook.register = function(name_or_map, func) {
  this.instance.register(name_or_map, func);
};

Pagehook.dispatch = function(name, arg) {
  this.instance.dispatch(name, arg);
};

// Pagehook.register "name", (arg)-> ...
// // or
// Pagehoook.register
//   name: (arg)->
Pagehook.prototype.register = function(name_or_map, func) {
  var name;

  if (typeof(name_or_map) === "string") {
    if (!this.definitions[name_or_map]) {
      this.definitions[name_or_map] = [];
    }
    this.definitions[name_or_map].push(func);
  } else {
    for (name in name_or_map) {
      this.register(name, name_or_map[name]);
    }
  }
};

// Pagehook.dispatch("name", {foo: 1, bar: 2})
Pagehook.prototype.dispatch = function(name, arg) {
  if (this.definitions[name]) {
    this.definitions[name].forEach(function(func) {
      func(arg);
    });
  } else {
    if (name !== Pagehook.GLOBAL_HOOK_NAME) {
      console.log("Pagehook for " + name + " is undefined");
    }
  }
};

// Event handler for DOMContentLoaded or turbolinks:load (turbolinks)
// Use `handler` property instead of this
Pagehook.prototype.handlerUnbound = function() {
  var elements, i, e, name, arg;

  this.dispatch(Pagehook.GLOBAL_HOOK_NAME);

  elements = document.querySelectorAll("[" + Pagehook.ATTRIBUTE_NAME + "]");
  for (i = 0; i < elements.length; i++) {
    e = elements[i];
    name = e.getAttribute(Pagehook.ATTRIBUTE_NAME);
    arg = this.isBlank(e.textContent) ? undefined : JSON.parse(e.textContent);
    this.dispatch(name, arg);
  }
};

Pagehook.prototype.isBlank = function(string) {
  return !!(string.match(/^\s*$/));
};

// instanciate singleton object
Pagehook.instance = new Pagehook();
Pagehook.handler = Pagehook.instance.handler;

module.exports = Pagehook;
