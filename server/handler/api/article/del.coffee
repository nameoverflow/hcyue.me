marked = require 'marked'

db = require '../../../model/db/model'
auth = require '../../../model/auth'
dbCb = require './handlePost'
post = db.post
module.exports = (conn, params) ->
    auth conn, () =>
        if not (conn.query || conn.query['id'])
            conn.send 'err', {
                err: 403
            }
        else
            post.remove {_id: conn.query['id']}, dbCb conn
