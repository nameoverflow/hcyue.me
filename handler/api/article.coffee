get = require './article/get.coffee'

module.exports = (conn, params) ->
    handler =
        'GET': get
        'POST': (conn, params) ->
            conn.send 'html', 'posted'
        'PUT': (conn, params) ->
            conn.send 'html', 'puted'
        'DELETE': (conn, params) ->
            conn.send 'html', 'deleted'

    handler[conn.request.method](conn, params)
