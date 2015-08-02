###
Import the core file
###
APP = require './server/core'

###
Create app object
###
app = new APP()

###
Static file server
###
staticFile = require './server/static_file'    
app.get '/static/*', staticFile 'public'

###
Index page
###
index = require './server/handler/index_page'
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
session_test = require './server/handler/session_test'
app.get '/name/{name}', session_test

###
Example of url params
###
app.get '/path/*', (conn,params) ->
    conn.send 'html', "<html>#{params.path}</html>"

