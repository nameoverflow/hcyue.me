get = require './article/get.coffee'
edit = require './article/edit.coffee'

module.exports = (conn, params) ->
    handler =
        'GET': get
        'POST': edit
        'PUT': (conn, params) ->
            conn.send 'html', 'puted'
        'DELETE': (conn, params) ->
            conn.send 'html', 'deleted'

    handler[conn._req.method] conn, params
