type Hook = (arg: any) => void;
type Hooks = {[key: string]: Hook};
type Definitions = {[key: string]: Hook[]};

// constructor
class Pagehook {
  static GLOBAL_HOOK_NAME = "@global";
  static ATTRIBUTE_NAME = "data-pagehook";
  static instance: Pagehook;
  static handler: () => void;

  private definitions: Definitions;
  public handler: () => void;

  constructor() {
    this.definitions = {};
    this.handler = this.handlerUnbound.bind(this);
  }

  static register(name_or_map: (string|Hooks), func: Hook) {
    this.instance.register(name_or_map, func);
  };

  static dispatch(name: string, arg: any = undefined) {
    this.instance.dispatch(name, arg);
  };

  // Pagehook.register "name", (arg)-> ...
  // // or
  // Pagehoook.register
  //   name: (arg)->
  register(name_or_map: (string|Hooks), func: Hook) {
    if (typeof(name_or_map) === "string") {
      if (!this.definitions[name_or_map]) {
        this.definitions[name_or_map] = [];
      }
      this.definitions[name_or_map].push(func);
    } else {
      let name: string;
      for (name in name_or_map) {
        this.register(name, name_or_map[name]);
      }
    }
  };

  // Pagehook.dispatch("name", {foo: 1, bar: 2})
  dispatch(name: string, arg: any = undefined) {
    if (this.definitions[name]) {
      this.definitions[name].forEach((func) => {
        func(arg);
      });
    } else {
      if (name !== Pagehook.GLOBAL_HOOK_NAME) {
        console.log("Pagehook for " + name + " is undefined");
      }
    }
  };

  clear() {
    this.definitions = {};
  };

  // Event handler for DOMContentLoaded or turbolinks:load (turbolinks)
  // Use `handler` property instead of this
  private handlerUnbound() {
    this.dispatch(Pagehook.GLOBAL_HOOK_NAME);

    const elements = document.querySelectorAll("[" + Pagehook.ATTRIBUTE_NAME + "]");

    for (let i = 0; i < elements.length; i++) {
      const e = elements[i];
      const name = e.getAttribute(Pagehook.ATTRIBUTE_NAME) as string;
      const arg = this.isBlank(e.textContent) ? undefined : JSON.parse(e.textContent as string);
      this.dispatch(name, arg);
    }
  };

  private isBlank(s: (string|null)): boolean {
    if (s === null) return true;
    return !!(s.match(/^\s*$/));
  };
}

// instanciate singleton object
Pagehook.instance = new Pagehook();
Pagehook.handler = Pagehook.instance.handler;

export default Pagehook;
