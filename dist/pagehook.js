"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// constructor
var Pagehook = /** @class */ (function () {
    function Pagehook() {
        this.definitions = {};
        this.handler = this.handlerUnbound.bind(this);
    }
    Pagehook.register = function (name_or_map, func) {
        this.instance.register(name_or_map, func);
    };
    ;
    Pagehook.dispatch = function (name, arg) {
        if (arg === void 0) { arg = undefined; }
        this.instance.dispatch(name, arg);
    };
    ;
    // Pagehook.register "name", (arg)-> ...
    // // or
    // Pagehoook.register
    //   name: (arg)->
    Pagehook.prototype.register = function (name_or_map, func) {
        if (typeof (name_or_map) === "string") {
            if (!this.definitions[name_or_map]) {
                this.definitions[name_or_map] = [];
            }
            this.definitions[name_or_map].push(func);
        }
        else {
            var name_1;
            for (name_1 in name_or_map) {
                this.register(name_1, name_or_map[name_1]);
            }
        }
    };
    ;
    // Pagehook.dispatch("name", {foo: 1, bar: 2})
    Pagehook.prototype.dispatch = function (name, arg) {
        if (arg === void 0) { arg = undefined; }
        if (this.definitions[name]) {
            this.definitions[name].forEach(function (func) {
                func(arg);
            });
        }
        else {
            if (name !== Pagehook.GLOBAL_HOOK_NAME) {
                console.log("Pagehook for " + name + " is undefined");
            }
        }
    };
    ;
    // Event handler for DOMContentLoaded or turbolinks:load (turbolinks)
    // Use `handler` property instead of this
    Pagehook.prototype.handlerUnbound = function () {
        this.dispatch(Pagehook.GLOBAL_HOOK_NAME);
        var elements = document.querySelectorAll("[" + Pagehook.ATTRIBUTE_NAME + "]");
        for (var i = 0; i < elements.length; i++) {
            var e = elements[i];
            var name_2 = e.getAttribute(Pagehook.ATTRIBUTE_NAME);
            var arg = this.isBlank(e.textContent) ? undefined : JSON.parse(e.textContent);
            this.dispatch(name_2, arg);
        }
    };
    ;
    Pagehook.prototype.isBlank = function (s) {
        if (s === null)
            return true;
        return !!(s.match(/^\s*$/));
    };
    ;
    Pagehook.GLOBAL_HOOK_NAME = "@global";
    Pagehook.ATTRIBUTE_NAME = "data-pagehook";
    return Pagehook;
}());
// instanciate singleton object
Pagehook.instance = new Pagehook();
Pagehook.handler = Pagehook.instance.handler;
exports.default = Pagehook;
