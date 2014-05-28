@Pagehook = class Pagehook
  @GLOBAL_HOOK_NAME = "@global"
  @ATTRIBUTE_NAME = "data-pagehook"

  # singleton methods
  @register = (args...)->
    @instance.register(args...)

  @dispatch = (args...)->
    @instance.dispatch(args...)

  constructor: ->
    @definitions = []
    @handler = =>
      @handlerUnbound()

  # Pagehook.register "name", (args)-> ...
  # # or
  # Pagehoook.register
  #   name: (args)->
  register: (name_or_map, func) ->
    if typeof(name_or_map) == "string"
      @definitions.push [name_or_map, func]
    else
      for name, func of name_or_map
        @definitions.push [name, func]

  # Pagehook.dispatch("name", {foo: 1, bar: 2})
  dispatch: (name, params) ->
    for [registered, func] in @definitions
      if registered == name
        func(params)

  # Event handler for DOMContentLoaded or page:change (turbolinks)
  # Use `handler` property instead of this
  handlerUnbound: ->
    @dispatch(Pagehook.GLOBAL_HOOK_NAME)

    for e in document.querySelectorAll("[#{Pagehook.ATTRIBUTE_NAME}]")
      name = e.getAttribute(Pagehook.ATTRIBUTE_NAME)
      args = if @isBlank(e.textContent) then undefined else JSON.parse(e.textContent)
      @dispatch(name, args)

  isBlank: (string)->
    !!(string.match(/^\s*$/))

# instanciate singleton object
@Pagehook.instance = new Pagehook()
@Pagehook.handler = @Pagehook.instance.handler
