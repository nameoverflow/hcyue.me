module.exports = (app) ->

    app.route ['/', '/*'], (conn, params) ->
        render = require './model/render'
        render conn
        conn.view 'index'

    app.route '/api/article', require './handler/api/article'
    app.route '/api/article/del', require './handler/api/article/del'
    app.route '/api/time', require './handler/api/time'


    app.route '/admin', require './handler/admin/list'
    app.route '/admin/login', require './handler/admin/login'
    app.route '/admin/logout', require './handler/admin/logout'
    app.route '/admin/edit/{post}', require './handler/admin/edit'


    app.route '/static/*', (require 'yue/static') './public'

    app.route '/favicon.ico', (conn, params) ->
        conn.send 'jump', '/static/favicon.ico'
