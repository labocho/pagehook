!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.Pagehook=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Pagehook,
  __slice = [].slice;

Pagehook = Pagehook = (function() {
  Pagehook.GLOBAL_HOOK_NAME = "@global";

  Pagehook.ATTRIBUTE_NAME = "data-pagehook";

  Pagehook.register = function() {
    var args, _ref;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return (_ref = this.instance).register.apply(_ref, args);
  };

  Pagehook.dispatch = function() {
    var args, _ref;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return (_ref = this.instance).dispatch.apply(_ref, args);
  };

  function Pagehook() {
    this.definitions = {};
    this.handler = (function(_this) {
      return function() {
        return _this.handlerUnbound();
      };
    })(this);
  }

  Pagehook.prototype.register = function(name_or_map, func) {
    var name, _base, _results;
    if (typeof name_or_map === "string") {
      return ((_base = this.definitions)[name_or_map] || (_base[name_or_map] = [])).push(func);
    } else {
      _results = [];
      for (name in name_or_map) {
        func = name_or_map[name];
        _results.push(this.register(name, func));
      }
      return _results;
    }
  };

  Pagehook.prototype.dispatch = function(name, arg) {
    var func, _i, _len, _ref, _results;
    if (this.definitions[name]) {
      _ref = this.definitions[name];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        func = _ref[_i];
        _results.push(func(arg));
      }
      return _results;
    } else {
      if (name !== Pagehook.GLOBAL_HOOK_NAME) {
        return console.log("Pagehook for " + name + " is undefined");
      }
    }
  };

  Pagehook.prototype.handlerUnbound = function() {
    var arg, e, name, _i, _len, _ref, _results;
    this.dispatch(Pagehook.GLOBAL_HOOK_NAME);
    _ref = document.querySelectorAll("[" + Pagehook.ATTRIBUTE_NAME + "]");
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      e = _ref[_i];
      name = e.getAttribute(Pagehook.ATTRIBUTE_NAME);
      arg = this.isBlank(e.textContent) ? void 0 : JSON.parse(e.textContent);
      _results.push(this.dispatch(name, arg));
    }
    return _results;
  };

  Pagehook.prototype.isBlank = function(string) {
    return !!(string.match(/^\s*$/));
  };

  return Pagehook;

})();

Pagehook.instance = new Pagehook();

Pagehook.handler = Pagehook.instance.handler;

module.exports = Pagehook;



},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmlzaGkvRHJvcGJveC9EZXZlbG9wbWVudC9jb2ZmZWUvcGFnZWhvb2svc3JjL3BhZ2Vob29rLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUEsUUFBQTtFQUFBLGtCQUFBOztBQUFBLFFBQUEsR0FBaUI7QUFDZixFQUFBLFFBQUMsQ0FBQSxnQkFBRCxHQUFvQixTQUFwQixDQUFBOztBQUFBLEVBQ0EsUUFBQyxDQUFBLGNBQUQsR0FBa0IsZUFEbEIsQ0FBQTs7QUFBQSxFQUlBLFFBQUMsQ0FBQSxRQUFELEdBQVksU0FBQSxHQUFBO0FBQ1YsUUFBQSxVQUFBO0FBQUEsSUFEVyw4REFDWCxDQUFBO1dBQUEsUUFBQSxJQUFDLENBQUEsUUFBRCxDQUFTLENBQUMsUUFBVixhQUFtQixJQUFuQixFQURVO0VBQUEsQ0FKWixDQUFBOztBQUFBLEVBT0EsUUFBQyxDQUFBLFFBQUQsR0FBWSxTQUFBLEdBQUE7QUFDVixRQUFBLFVBQUE7QUFBQSxJQURXLDhEQUNYLENBQUE7V0FBQSxRQUFBLElBQUMsQ0FBQSxRQUFELENBQVMsQ0FBQyxRQUFWLGFBQW1CLElBQW5CLEVBRFU7RUFBQSxDQVBaLENBQUE7O0FBVWEsRUFBQSxrQkFBQSxHQUFBO0FBQ1gsSUFBQSxJQUFDLENBQUEsV0FBRCxHQUFlLEVBQWYsQ0FBQTtBQUFBLElBQ0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxDQUFBLFNBQUEsS0FBQSxHQUFBO2FBQUEsU0FBQSxHQUFBO2VBQ1QsS0FBQyxDQUFBLGNBQUQsQ0FBQSxFQURTO01BQUEsRUFBQTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FEWCxDQURXO0VBQUEsQ0FWYjs7QUFBQSxxQkFtQkEsUUFBQSxHQUFVLFNBQUMsV0FBRCxFQUFjLElBQWQsR0FBQTtBQUNSLFFBQUEscUJBQUE7QUFBQSxJQUFBLElBQUcsTUFBQSxDQUFBLFdBQUEsS0FBdUIsUUFBMUI7YUFDRSxVQUFDLElBQUMsQ0FBQSxZQUFZLENBQUEsV0FBQSxXQUFBLENBQUEsV0FBQSxJQUFpQixHQUEvQixDQUFrQyxDQUFDLElBQW5DLENBQXdDLElBQXhDLEVBREY7S0FBQSxNQUFBO0FBR0U7V0FBQSxtQkFBQTtpQ0FBQTtBQUNFLHNCQUFBLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVixFQUFnQixJQUFoQixFQUFBLENBREY7QUFBQTtzQkFIRjtLQURRO0VBQUEsQ0FuQlYsQ0FBQTs7QUFBQSxxQkEyQkEsUUFBQSxHQUFVLFNBQUMsSUFBRCxFQUFPLEdBQVAsR0FBQTtBQUNSLFFBQUEsOEJBQUE7QUFBQSxJQUFBLElBQUcsSUFBQyxDQUFBLFdBQVksQ0FBQSxJQUFBLENBQWhCO0FBQ0U7QUFBQTtXQUFBLDJDQUFBO3dCQUFBO0FBQUEsc0JBQUEsSUFBQSxDQUFLLEdBQUwsRUFBQSxDQUFBO0FBQUE7c0JBREY7S0FBQSxNQUFBO0FBR0UsTUFBQSxJQUFPLElBQUEsS0FBUSxRQUFRLENBQUMsZ0JBQXhCO2VBQ0UsT0FBTyxDQUFDLEdBQVIsQ0FBYSxlQUFBLEdBQWUsSUFBZixHQUFvQixlQUFqQyxFQURGO09BSEY7S0FEUTtFQUFBLENBM0JWLENBQUE7O0FBQUEscUJBb0NBLGNBQUEsR0FBZ0IsU0FBQSxHQUFBO0FBQ2QsUUFBQSxzQ0FBQTtBQUFBLElBQUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxRQUFRLENBQUMsZ0JBQW5CLENBQUEsQ0FBQTtBQUVBO0FBQUE7U0FBQSwyQ0FBQTttQkFBQTtBQUNFLE1BQUEsSUFBQSxHQUFPLENBQUMsQ0FBQyxZQUFGLENBQWUsUUFBUSxDQUFDLGNBQXhCLENBQVAsQ0FBQTtBQUFBLE1BQ0EsR0FBQSxHQUFTLElBQUMsQ0FBQSxPQUFELENBQVMsQ0FBQyxDQUFDLFdBQVgsQ0FBSCxHQUFnQyxNQUFoQyxHQUErQyxJQUFJLENBQUMsS0FBTCxDQUFXLENBQUMsQ0FBQyxXQUFiLENBRHJELENBQUE7QUFBQSxvQkFFQSxJQUFDLENBQUEsUUFBRCxDQUFVLElBQVYsRUFBZ0IsR0FBaEIsRUFGQSxDQURGO0FBQUE7b0JBSGM7RUFBQSxDQXBDaEIsQ0FBQTs7QUFBQSxxQkE0Q0EsT0FBQSxHQUFTLFNBQUMsTUFBRCxHQUFBO1dBQ1AsQ0FBQSxDQUFDLENBQUUsTUFBTSxDQUFDLEtBQVAsQ0FBYSxPQUFiLENBQUQsRUFESztFQUFBLENBNUNULENBQUE7O2tCQUFBOztJQURGLENBQUE7O0FBQUEsUUFpRFEsQ0FBQyxRQUFULEdBQXdCLElBQUEsUUFBQSxDQUFBLENBakR4QixDQUFBOztBQUFBLFFBa0RRLENBQUMsT0FBVCxHQUFtQixRQUFRLENBQUMsUUFBUSxDQUFDLE9BbERyQyxDQUFBOztBQUFBLE1Bb0RNLENBQUMsT0FBUCxHQUFpQixRQXBEakIsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJQYWdlaG9vayA9IGNsYXNzIFBhZ2Vob29rXG4gIEBHTE9CQUxfSE9PS19OQU1FID0gXCJAZ2xvYmFsXCJcbiAgQEFUVFJJQlVURV9OQU1FID0gXCJkYXRhLXBhZ2Vob29rXCJcblxuICAjIHNpbmdsZXRvbiBtZXRob2RzXG4gIEByZWdpc3RlciA9IChhcmdzLi4uKS0+XG4gICAgQGluc3RhbmNlLnJlZ2lzdGVyKGFyZ3MuLi4pXG5cbiAgQGRpc3BhdGNoID0gKGFyZ3MuLi4pLT5cbiAgICBAaW5zdGFuY2UuZGlzcGF0Y2goYXJncy4uLilcblxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBAZGVmaW5pdGlvbnMgPSB7fVxuICAgIEBoYW5kbGVyID0gPT5cbiAgICAgIEBoYW5kbGVyVW5ib3VuZCgpXG5cbiAgIyBQYWdlaG9vay5yZWdpc3RlciBcIm5hbWVcIiwgKGFyZyktPiAuLi5cbiAgIyAjIG9yXG4gICMgUGFnZWhvb29rLnJlZ2lzdGVyXG4gICMgICBuYW1lOiAoYXJnKS0+XG4gIHJlZ2lzdGVyOiAobmFtZV9vcl9tYXAsIGZ1bmMpIC0+XG4gICAgaWYgdHlwZW9mKG5hbWVfb3JfbWFwKSA9PSBcInN0cmluZ1wiXG4gICAgICAoQGRlZmluaXRpb25zW25hbWVfb3JfbWFwXSB8fD0gW10pLnB1c2goZnVuYylcbiAgICBlbHNlXG4gICAgICBmb3IgbmFtZSwgZnVuYyBvZiBuYW1lX29yX21hcFxuICAgICAgICBAcmVnaXN0ZXIobmFtZSwgZnVuYylcblxuICAjIFBhZ2Vob29rLmRpc3BhdGNoKFwibmFtZVwiLCB7Zm9vOiAxLCBiYXI6IDJ9KVxuICBkaXNwYXRjaDogKG5hbWUsIGFyZykgLT5cbiAgICBpZiBAZGVmaW5pdGlvbnNbbmFtZV1cbiAgICAgIGZ1bmMoYXJnKSBmb3IgZnVuYyBpbiBAZGVmaW5pdGlvbnNbbmFtZV1cbiAgICBlbHNlXG4gICAgICB1bmxlc3MgbmFtZSA9PSBQYWdlaG9vay5HTE9CQUxfSE9PS19OQU1FXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGFnZWhvb2sgZm9yICN7bmFtZX0gaXMgdW5kZWZpbmVkXCIpXG5cbiAgIyBFdmVudCBoYW5kbGVyIGZvciBET01Db250ZW50TG9hZGVkIG9yIHBhZ2U6Y2hhbmdlICh0dXJib2xpbmtzKVxuICAjIFVzZSBgaGFuZGxlcmAgcHJvcGVydHkgaW5zdGVhZCBvZiB0aGlzXG4gIGhhbmRsZXJVbmJvdW5kOiAtPlxuICAgIEBkaXNwYXRjaChQYWdlaG9vay5HTE9CQUxfSE9PS19OQU1FKVxuXG4gICAgZm9yIGUgaW4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIlsje1BhZ2Vob29rLkFUVFJJQlVURV9OQU1FfV1cIilcbiAgICAgIG5hbWUgPSBlLmdldEF0dHJpYnV0ZShQYWdlaG9vay5BVFRSSUJVVEVfTkFNRSlcbiAgICAgIGFyZyA9IGlmIEBpc0JsYW5rKGUudGV4dENvbnRlbnQpIHRoZW4gdW5kZWZpbmVkIGVsc2UgSlNPTi5wYXJzZShlLnRleHRDb250ZW50KVxuICAgICAgQGRpc3BhdGNoKG5hbWUsIGFyZylcblxuICBpc0JsYW5rOiAoc3RyaW5nKS0+XG4gICAgISEoc3RyaW5nLm1hdGNoKC9eXFxzKiQvKSlcblxuIyBpbnN0YW5jaWF0ZSBzaW5nbGV0b24gb2JqZWN0XG5QYWdlaG9vay5pbnN0YW5jZSA9IG5ldyBQYWdlaG9vaygpXG5QYWdlaG9vay5oYW5kbGVyID0gUGFnZWhvb2suaW5zdGFuY2UuaGFuZGxlclxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZ2Vob29rXG4iXX0=
