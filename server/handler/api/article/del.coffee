marked = require 'marked'

db = require '../../../model/db/model'
auth = require '../../../model/auth'
dbCb = require './handlePost'

module.exports = (conn, params) ->
    auth conn, () =>
        if not (conn.query || conn.query['id'])
            conn.send 'err', {
                err: 403
            }
        else
            db.rm 'Post', {_id: conn.query['id']}, dbCb conn
