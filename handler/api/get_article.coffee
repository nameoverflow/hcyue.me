db = require '../../model/db.coffee'

module.exports = (conn, params) ->
    if params.query
        start = +params.query['start'] || 1
        limit = +params.query['limit'] || 1
        summary = +params.query['summary'] || false
    if not (start and limit)
        conn.send 'err', {
            err: 500
            message: '少年你很有想法'
        }

    cur = db.find 'Post', {type: 'article'}

    cur.limit(limit).sort({date: -1}).select('_id title tags createDate')

    if summary
        cur.select '+summary'

    cur.exec (err, row) ->
        if err
            conn.send 'err', {
                err: 500
                message: 'error when select data'
            }
        conn.send 'json', row





