APP = require './server/server_core'
Router = require './server/server_core/router'

app = new APP(Router)

index = require './server/handler/index_page'
app.get '/', index

app.get '/favicon.ico', (conn, params) ->
    conn.send 'define', '', {status: 404}

session_test = require './server/handler/session_test'
app.get '/{name}', session_test

