jade = require 'jade'
yaml = require 'js-yaml'

module.exports = (path, data) ->
    fuck = jade.compileFile path
    fuck data
