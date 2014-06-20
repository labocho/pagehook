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

  this.Pagehook.instance = new Pagehook();

  this.Pagehook.handler = this.Pagehook.instance.handler;

}).call(this);

//# sourceMappingURL=pagehook.js.map
