Pagehook
====================

Pagehook is DOM based script runner.
It makes you can define scripts for each page on web application.


Example
--------------------

in JS:

```ts
// Load library
import Pagehook from "pagehook";

// Define hooks
Pagehook.register("articles/show", (data: any) => {
    alert("Article loaded: " + data.id);
});

// Register event handler
document.addEventListener("DOMContentLoaded", Pagehook.handler);
```

in HTML:

```html
<!-- Put trigger element on each page -->
<script type="application/json" data-pagehook="articles/show">{"id": 123}</script>
```


Installation
--------------------

Run this.

```sh
yarn add pagehook
# or
npm install pagehook
```


Defining hooks
--------------------

You can define a hook by name and function,

```ts
Pagehook.register("articles/show", (data: any) => {
  // some code
});
```

or by object.

```ts
Pagehook.register({
  "articles/show": (data: any) => {
    // some code
  },
  "articles/form": (data: any) => {
    // some code
  }
});
```

If you define some hooks with same name. It runs sequently.

```ts
Pagehook.register("articles/show", (data: any) => {
  // Runs first
});
Pagehook.register("articles/show", (data: any) => {
  // Runs second
});
```


Event handler
--------------------

You should register event handler `Pagehook.handler` for `DOMContentLoaded`.

```ts
document.addEventListener("DOMContentLoaded", Pagehook.handler);
```

If you use jQuery, you can also do this.

```ts
$(Pagehook.handler);
```


Trigger element
--------------------

You should put "trigger element" like below on each page.

```html
<script type="application/json" data-pagehook="articles/show">{"id": 123}</script>
```

- `type` must be `application/json` (to be ignored by browser)
- `data-pagehook` must be hook name.
- Content of the element will be parsed as JSON, and pass to hook as argument.

If the element has no content, pass `undefined` to hook.

Pagehook find all elements have `data-pagehook` attribute, and runs defined hooks named attribute value.


Global hook
--------------------

You can define "Global hook" that runs before any hook on all page.

```ts
Pagehook.register("@global", () => {
  // Runs before any hook
});
```


Import all hooks in the directory
--------------------

```ts
// Require all hooks in ./pagehook
interface RequireHook {
  (fileName: string): object | {default: object};
  keys: () => string[];
}
interface NodeRequireWithContext extends NodeRequire {
  context: (a: string, b: boolean, c: RegExp) => RequireHook;
}

const requireHook = (require as NodeRequireWithContext).context(
  "./pagehook", // Import all hooks in this directory
  true, // Whether or not to look in subdirectories
  /[a-z0-9_]+\.(js|ts)$/u,
);

requireHook.keys().forEach((fileName: string) => {
  requireHook(fileName);
});
```


Contributing
--------------------

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


