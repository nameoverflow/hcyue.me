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

app.route '/fck', (conn, params) ->
    conn.send 'jump', '/'
###
Main page
###
index = require './handler/main_page'
app.route ['/', '/archives', '/lab', '/about', '/article/*'], index


###
APIs
###

get_article = require './handler/api/article'
app.route '/api/article', get_article

test = require './handler/api/test'
app.route '/api/fuck', test

###
Admin
###
admin_index = require './handler/admin/list'
app.route '/admin', admin_index

admin_login = require './handler/admin/login'
app.route '/admin/login', admin_login

admin_logout = require './handler/admin/logout'
app.route '/admin/logout', admin_logout
