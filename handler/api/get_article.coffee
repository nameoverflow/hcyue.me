db = require '../../model/db.coffee'

module.exports = (conn, params) ->
    if params.query
        if id = params.query['id']
            db.findById 'Post', id, (err, row) ->
                if err
                    conn.send 'err', {
                        err: 500
                        message: 'id not found!'
                    }
                conn.send 'json', row
            return

        start = +params.query['start'] || 0
        limit = +params.query['limit'] || 1
        type = params.query['type'] || 'all'
        # summary | title | all
    if not (start and limit)
        conn.send 'err', {
            err: 500
            message: '少年你很有想法'
        }

    cur = db.find 'Post', {type: 'article'}

    cur.limit(limit).sort({date: -1}).select('_id title tags createDate')

    switch type
        when 'summary'
            cur.select '+summary'
        when 'all'
            cur.select '+body'

    cur.exec (err, row) ->
        if err
            conn.send 'err', {
                err: 500
                message: 'error when select data'
            }
        conn.send 'json', row





