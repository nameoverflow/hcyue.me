yaml = require 'js-yaml'
render = require '../../model/render'
fs = require 'fs'
acc = (yaml.safeLoad fs.readFileSync './config.yml', 'utf8').site.admin
module.exports = (conn, params) ->
    conn.session (session) ->
        if (session.get 'auth') is 'admin'
            conn.send 'jump', '/admin'
            return
        if conn.request.method is 'GET'
            conn.send 'html', render './view/admin/login.jade'
        else if conn.request.method is 'POST'
            if conn.body['account'] is acc.name and conn.body['passwd'] is acc.passwd
                session.set {'auth': 'admin'}
                conn.send 'jump', '/admin'
            else
                conn.send 'html', render './view/admin/login.jade', {message: 'Login failed!'}
        else
            conn.send 'html', render './view/admin/login.jade', {message: '你是凯丁吗？'}
