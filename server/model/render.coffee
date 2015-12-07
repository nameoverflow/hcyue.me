jade = require 'jade'
yaml = require 'js-yaml'

module.exports = (conn) ->
    view_path = conn.getConf('view').path
    console.log view_path
    conn.view = (path, data) ->
        fuck = jade.compileFile view_path + path
        
        data._conf[name] = val of conn.getConf 'tpl_globals'
        
        conn.send 'html', fuck data