db = require '../../model/db'
query = require 'querystring'

module.exports = (conn, params) ->
    conn.session (session) ->
        if conn.request.method is 'GET'
            if (session.get 'auth') isnt 'admin'
                conn.send 'jump', '/admin/login'
            else
                conn.send 'html', 'admin!'

        else if conn.request.method is 'POST'
            console.log conn.body

            conn.send 'html', 'POSTED!'
        else
            conn.send 'err', {
                err: 405,
                message: '你是凯丁吗'
            }
