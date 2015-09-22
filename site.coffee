###
Import the core file
###
yue = require 'yue'

###
Create app object
###
app = new yue.app()

###
Static file server
###
staticFile = require 'yue/static'
app.route '/static/*', staticFile 'public'

app.route '/favicon.ico', (conn, params) ->
    conn.send 'jump', '/static/favicon.ico'
###
Main page
###
index = require './handler/main'
app.route ['/', '/archives', '/lab', '/about', '/article/*'], index


###
APIs
###

article = require './handler/api/article'
app.route '/api/article', article

article_del = require './handler/api/article/del'
app.route '/api/article/del', article_del

time = require './handler/api/time'
app.route '/api/time', time

###
Admin
###
admin_index = require './handler/admin/list'
app.route '/admin', admin_index

admin_login = require './handler/admin/login'
app.route '/admin/login', admin_login

admin_logout = require './handler/admin/logout'
app.route '/admin/logout', admin_logout

admin_edit = require './handler/admin/edit'
app.route '/admin/edit/{post}', admin_edit
