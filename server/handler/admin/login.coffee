yaml = require 'js-yaml'
render = require '../../model/render'
module.exports = (conn, params) ->
    acc = conn.getConf('site').admin
    render conn
    conn.session (session) ->
        if (session.get 'auth') is 'admin'
            conn.jump '/admin'
        else
            if conn._req.method is 'GET'
                conn.view 'admin/login'
            else if conn._req.method is 'POST'
                console.log acc
                if conn.body['account'] is acc.name and conn.body['passwd'] is acc.passwd
                    session.set {'auth': 'admin'}
                    conn.jump '/admin'
                else
                    conn.view 'admin/login', {message: 'Login failed!'}
            else
                conn.view 'admin/login', {message: '你是凯丁吗？'}
