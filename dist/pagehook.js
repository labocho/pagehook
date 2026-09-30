"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagehook = void 0;
// constructor
class Pagehook {
    constructor() {
        this.definitions = {};
        this.handler = this.handlerUnbound.bind(this);
    }
    static register(name_or_map, func) {
        this.instance.register(name_or_map, func);
    }
    ;
    static dispatch(name, arg = undefined) {
        this.instance.dispatch(name, arg);
    }
    ;
    // Pagehook.register "name", (arg)-> ...
    // // or
    // Pagehoook.register
    //   name: (arg)->
    register(name_or_map, func) {
        if (typeof (name_or_map) === "string") {
            if (!this.definitions[name_or_map]) {
                this.definitions[name_or_map] = [];
            }
            this.definitions[name_or_map].push(func);
        }
        else {
            let name;
            for (name in name_or_map) {
                this.register(name, name_or_map[name]);
            }
        }
    }
    ;
    // Pagehook.dispatch("name", {foo: 1, bar: 2})
    dispatch(name, arg = undefined) {
        if (this.definitions[name]) {
            this.definitions[name].forEach((func) => {
                func(arg);
            });
        }
        else {
            if (name !== Pagehook.GLOBAL_HOOK_NAME) {
                console.log("Pagehook for " + name + " is undefined");
            }
        }
    }
    ;
    clear() {
        this.definitions = {};
    }
    ;
    // Event handler for DOMContentLoaded or turbolinks:load (turbolinks)
    // Use `handler` property instead of this
    handlerUnbound() {
        this.dispatch(Pagehook.GLOBAL_HOOK_NAME);
        const elements = document.querySelectorAll("[" + Pagehook.ATTRIBUTE_NAME + "]");
        for (let i = 0; i < elements.length; i++) {
            const e = elements[i];
            const name = e.getAttribute(Pagehook.ATTRIBUTE_NAME);
            const arg = this.isBlank(e.textContent) ? undefined : JSON.parse(e.textContent);
            this.dispatch(name, arg);
        }
    }
    ;
    isBlank(s) {
        if (s === null)
            return true;
        return !!(s.match(/^\s*$/));
    }
    ;
}
exports.Pagehook = Pagehook;
Pagehook.GLOBAL_HOOK_NAME = "@global";
Pagehook.ATTRIBUTE_NAME = "data-pagehook";
// instanciate singleton object
Pagehook.instance = new Pagehook();
Pagehook.handler = Pagehook.instance.handler;
