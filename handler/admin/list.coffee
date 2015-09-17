db = require '../../model/db'
query = require 'querystring'
render = require '../../model/render'
module.exports = (conn, params) ->
    conn.session (session) ->
        if (session.get 'auth') isnt 'admin'
            conn.send 'jump', '/admin/login'
        else
            conn.send 'html', render './view/admin/index.jade'
