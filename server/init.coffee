yaml = require 'js-yaml'
marked = require 'marked'
pygment = require 'pygmentize-bundled'

config = require './config'
###
Import the core file
###
yue = require 'yue'
marked.setOptions {
    highlight: (code, lang, callback) ->
        pygment {
            lang: lang
            format: 'html'
            options: 
                encoding: 'utf-8'
        }, code, (err, res) ->
            callback err, res && res.toString()
}
###
Create app object
###
module.exports = new yue(config)

