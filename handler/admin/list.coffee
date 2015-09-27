db = require '../../model/db'
query = require 'querystring'
render = require '../../model/render'
module.exports = (conn, params) ->
    conn.session (session) ->
        if (session.get 'auth') isnt 'admin'
            return conn.send 'jump', '/admin/login'
        fuck =
            page: false
        if conn.query && conn.query['pages']
            fuck.page = true
        conn.send 'html', render './view/admin/index.jade', fuck
