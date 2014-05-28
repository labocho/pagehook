(function() {
  var Pagehook,
    __slice = [].slice;

  this.Pagehook = Pagehook = (function() {
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
      this.definitions = [];
      this.handler = (function(_this) {
        return function() {
          return _this.handlerUnbound();
        };
      })(this);
    }

    Pagehook.prototype.register = function(name_or_map, func) {
      var name, _results;
      if (typeof name_or_map === "string") {
        return this.definitions.push([name_or_map, func]);
      } else {
        _results = [];
        for (name in name_or_map) {
          func = name_or_map[name];
          _results.push(this.definitions.push([name, func]));
        }
        return _results;
      }
    };

    Pagehook.prototype.dispatch = function(name, params) {
      var func, registered, _i, _len, _ref, _ref1, _results;
      _ref = this.definitions;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], registered = _ref1[0], func = _ref1[1];
        if (registered === name) {
          _results.push(func(params));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Pagehook.prototype.handlerUnbound = function() {
      var args, e, name, _i, _len, _ref, _results;
      this.dispatch(Pagehook.GLOBAL_HOOK_NAME);
      _ref = document.querySelectorAll("[" + Pagehook.ATTRIBUTE_NAME + "]");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        name = e.getAttribute(Pagehook.ATTRIBUTE_NAME);
        args = this.isBlank(e.textContent) ? void 0 : JSON.parse(e.textContent);
        _results.push(this.dispatch(name, args));
      }
      return _results;
    };

    Pagehook.prototype.isBlank = function(string) {
      return !!(string.match(/^\s*$/));
    };

    return Pagehook;

  })();

  this.Pagehook.instance = new Pagehook();

  this.Pagehook.handler = this.Pagehook.instance.handler;

}).call(this);

//# sourceMappingURL=pagehook.js.map
