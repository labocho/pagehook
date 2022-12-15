/**
 * @jest-environment jsdom
 */

import Pagehook from "../src/pagehook"

function createElement(tag: string, attrs: {[key: string]: string}, text: string): HTMLElement {
  const e = document.createElement(tag) as HTMLElement;
  for(let k in attrs) {
    e.setAttribute(k, attrs[k]);
  }
  e.textContent = text;
  return e;
}

test("test", () => {
  console.log(document)
  expect(1).toEqual(1);
});

describe("Pagehook", () => {
  let result: string[];

  beforeEach(() => {
    result = [];
    Pagehook.instance.clear()
    Pagehook.register("foo", () => {
      result.push("First")
    });
    Pagehook.register("foo", () => {
      result.push("Second")
    });
    Pagehook.register("bar", () => {
      result.push("Another")
    });
    Pagehook.register("with_args", (args) => {
      result.push(args)
    });
  })

  afterEach(() => {
    document.body.innerHTML = "";
  })

  describe("#dispatch", () => {
    it("should call the hooks sequently", () => {
      Pagehook.dispatch("foo");
      expect(result).toEqual(["First", "Second"]);
    })

    it("should call the hook with arguments", () => {
      Pagehook.dispatch("with_args", {foo: 1, bar: 2});
      expect(result).toEqual([{foo: 1, bar: 2}]);
    })
  })

  describe("#handler", () => {
    it("should call the hooks by trigger element", () => {
      document.body.appendChild(
        createElement("script", {type: "application/json", "data-pagehook": "foo"}, ""),
      );
      Pagehook.handler();
      expect(result).toEqual(["First", "Second"]);
    });

    it("should call the hook by trigger element with arguments", () => {
      document.body.appendChild(
        createElement("script", {type: "application/json", "data-pagehook": "with_args"}, '{"foo":1,"bar":2}'),
      );
      Pagehook.handler()
      expect(result).toEqual([{foo: 1, bar: 2}]);
    });

    it("should call the hook by multiple trigger elements", () => {
      document.body.appendChild(
        createElement("script", {type: "application/json", "data-pagehook": "with_args"}, '{"id":1}'),
      );
      document.body.appendChild(
        createElement("script", {type: "application/json", "data-pagehook": "with_args"}, '{"id":2}'),
      );
      Pagehook.handler()
      expect(result).toEqual([{id: 1}, {id: 2}])
    });
  });
})
