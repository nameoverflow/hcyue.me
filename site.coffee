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
staticFile = yue.static  
app.get '/static/*', staticFile 'public'

###
Main page
###
index = require './handler/main_page'
app.get ['/', '/archives', '/lab', '/about', '/article/*'], index


###
APIs
###

get_article = require './handler/api/get_article'
app.get '/api/article/get', get_article


