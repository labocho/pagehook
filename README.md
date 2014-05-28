Pagehook
====================

Pagehook is DOM based script runner.
It makes you can define scripts for each page on web application.


Example
--------------------

    <!-- Load library -->
    <script src="pagehook.js"></script>

    <!-- Define hooks -->
    <script>
    Pagehook.register("articles/show", function(data) {
        alert("Article loaded: " + data.id);
    });
    </script>

    <!-- Register event handler -->
    <script>
    document.addEventHandler("DOMContentLoaded", Pagehook.handler);
    </script>

    <!-- Put trigger element on each page -->
    <script type="application/json" data-pagehook="articles/show">{"id": 123}</script>


Installation
--------------------

If you use [bower](http://bower.io/), run this.

    bower install pagehook

and load `lib/pagebook.js`.

    <script src="bower_components/pagehook/lib/pagebook.js"></script>

Or copy [lib/pagebook.js](https://raw.githubusercontent.com/labocho/pagehook/master/lib/pagehook.js) to your project simply.


Defining hooks
--------------------

You can define a hook by name and function,

    Pagehook.register("articles/show", function(data) {
        // some code
    });

or by object.

    Pagehook.register({
        "articles/show": function(data) {
            // some code
        },
        "articles/form": function(data) {
            // some code
        }
    });

If you define some hooks with same name. It runs sequently.

    Pagehook.register("articles/show", function(data) {
        // Runs first
    });
    Pagehook.register("articles/show", function(data) {
        // Runs second
    });


Event handler
--------------------

You should register event handler `Pagehook.handler` for `DOMContentLoaded`.

    document.addEventHandler("DOMContentLoaded", Pagehook.handler);

If you use jQuery, you can also do this.

    $(Pagehook.handler);

If you use [turbolinks](https://github.com/rails/turbolinks), you should do this.

    document.addEventHandler("page:change", Pagehook.handler);


Trigger element
--------------------

You should put "trigger element" like below on each page.

    <script type="application/json" data-pagehook="articles/show">{"id": 123}</script>

- `type` must be `application/json` (to be ignored by browser)
- `data-pagehook` must be hook name.
- Content of the element will be parsed as JSON, and pass to hook as argument.

If the element has no content, pass `undefined` to hook.

Pagehook find all elements have `data-pagehook` attribute, and runs defined hooks named attribute value.


Global hook
--------------------

You can define "Global hook" that runs before any hook on all page.

    Pagehook.register("@global", function() {
        // Runs before any hook
    });


Contributing
--------------------

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


