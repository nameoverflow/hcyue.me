yaml = require 'js-yaml'
render = require '../../model/render'
fs = require 'fs'
acc = (yaml.safeLoad fs.readFileSync './config.yml', 'utf8').site.admin
module.exports = (conn, params) ->
    conn.session (session) ->
        if (session.get 'auth') is 'admin'
            conn.send 'jump', '/admin'
        else
            if conn.request.method is 'GET'
                conn.view 'admin/login'
            else if conn.request.method is 'POST'
                if conn.body['account'] is acc.name and conn.body['passwd'] is acc.passwd
                    session.set {'auth': 'admin'}
                    conn.send 'jump', '/admin'
                else
                    conn.view 'admin/login', {message: 'Login failed!'}
            else
                conn.view 'admin/login', {message: '你是凯丁吗？'}
