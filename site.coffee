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
Index page
###
index = require './handler/main_page'
app.get '/', index
