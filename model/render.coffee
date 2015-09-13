jade = require 'jade'

module.exports = (path, data) ->
    fuck = jade.compileFile path
    fuck data
