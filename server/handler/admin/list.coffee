db = require '../../model/db'
query = require 'querystring'
render = require '../../model/render'
module.exports = (conn, params) ->
    conn.session (session) ->
        if (session.get 'auth') isnt 'admin'
            return conn.view 'admin/login'
        fuck =
            page: false
        if conn.query && conn.query['pages']
            fuck.page = true
        conn.view 'admin/index', fuck
