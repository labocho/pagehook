describe "Pagehook", ->
  result = null
  beforeEach ->
    window.d = false
    result = []
    Pagehook.instance.definitions = [] # clear hooks
    Pagehook.register "foo", ->
      result.push "First"
    Pagehook.register "foo", ->
      result.push "Second"
    Pagehook.register "bar", ->
      result.push "Another"
    Pagehook.register "with_args", (args)->
      result.push(args)

  afterEach ->
    $("#sandbox").html("")

  describe "#dispatch", ->
    it "should call the hooks sequently", ->
      Pagehook.dispatch("foo")
      expect(result).toEqual(["First", "Second"])

    it "should call the hook with arguments", ->
      Pagehook.dispatch("with_args", {foo: 1, bar: 2})
      expect(result).toEqual([{foo: 1, bar: 2}])

  describe "#handler", ->
    it "should call the hooks by trigger element", ->
      $("#sandbox").append(
        [ $("<script>").attr(type: "application/json", "data-pagehook": "foo")
        ]
      )
      Pagehook.handler()
      expect(result).toEqual(["First", "Second"])

    it "should call the hook by trigger element with arguments", ->
      $("#sandbox").append(
        [ $("<script>").attr(type: "application/json", "data-pagehook": "with_args").text('{"foo":1,"bar":2}')
        ]
      )
      Pagehook.handler()
      expect(result).toEqual([{foo: 1, bar: 2}])

    it "should call the hook by multiple trigger elements", ->
      $("#sandbox").append(
        [ $("<script>").attr(type: "application/json", "data-pagehook": "with_args").text('{"id":1}'),
          $("<script>").attr(type: "application/json", "data-pagehook": "with_args").text('{"id":2}')
        ]
      )
      Pagehook.handler()
      expect(result).toEqual([{id: 1}, {id: 2}])




