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


###
Using 301 redirect to get favicon....
###
app.get '/favicon.ico', (conn, params) ->
    conn.send 'define', '', {
        'status': 301
        'location' : '/static/favicon.ico'
    }

###
Example of session
###
session_test = require './handler/session_test'
app.get '/name/{name}', session_test

###
Example of url params
###
app.get '/path/*', (conn,params) ->
    conn.send 'html', "<html>#{params.path}</html>"

###
# API
###

getArticle = require './handler/api/get_article'
app.get '/api/get_article', getArticle
