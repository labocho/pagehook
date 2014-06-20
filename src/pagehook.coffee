@Pagehook = class Pagehook
  @GLOBAL_HOOK_NAME = "@global"
  @ATTRIBUTE_NAME = "data-pagehook"

  # singleton methods
  @register = (args...)->
    @instance.register(args...)

  @dispatch = (args...)->
    @instance.dispatch(args...)

  constructor: ->
    @definitions = {}
    @handler = =>
      @handlerUnbound()

  # Pagehook.register "name", (arg)-> ...
  # # or
  # Pagehoook.register
  #   name: (arg)->
  register: (name_or_map, func) ->
    if typeof(name_or_map) == "string"
      (@definitions[name_or_map] ||= []).push(func)
    else
      for name, func of name_or_map
        @register(name, func)

  # Pagehook.dispatch("name", {foo: 1, bar: 2})
  dispatch: (name, arg) ->
    if @definitions[name]
      func(arg) for func in @definitions[name]

  # Event handler for DOMContentLoaded or page:change (turbolinks)
  # Use `handler` property instead of this
  handlerUnbound: ->
    @dispatch(Pagehook.GLOBAL_HOOK_NAME)

    for e in document.querySelectorAll("[#{Pagehook.ATTRIBUTE_NAME}]")
      name = e.getAttribute(Pagehook.ATTRIBUTE_NAME)
      arg = if @isBlank(e.textContent) then undefined else JSON.parse(e.textContent)
      @dispatch(name, arg)

  isBlank: (string)->
    !!(string.match(/^\s*$/))

# instanciate singleton object
@Pagehook.instance = new Pagehook()
@Pagehook.handler = @Pagehook.instance.handler
