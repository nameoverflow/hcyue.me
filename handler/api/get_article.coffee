db = require '../../model/db.coffee'

module.exports = (conn, params) ->
    if params.query
        if id = params.query['id']
            db.findById 'Post', id, (err, row) ->
                if err
                    conn.send 'err', {
                        err: 500
                        message: err
                    }
                conn.send 'json', row
            return

        start = +params.query['start'] || 0
        limit = +params.query['limit'] || 1
        type = params.query['type'] || 'all'
        # summary | title | all
    cur = db.find 'Post', {type: 'article'}

    cur.sort({date: -1}).select('_id title tags createDate ' + (if type is 'summary' then 'summary' else if type is 'all' then 'body' else '')).skip(start).limit(limit)
    ###
    switch type
        when 'summary'
            cur.select '+summary'
        when 'all'
            cur.select '+body'
    ###

    cur.exec (err, row) ->
        if err
            conn.send 'err', {
                err: 500
                message: err
            }
        conn.send 'json', row





