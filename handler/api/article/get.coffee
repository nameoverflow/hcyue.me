db = require '../../../model/db.coffee'

module.exports = (conn, params) ->
    if conn.query
        if id = conn.query['id']
            return db.findById 'Post', id, (err, row) ->
                if err
                    conn.send 'err', {
                        err: 500
                        message: err
                    }
                conn.send 'json', row
        start = +conn.query['start'] || 0
        limit = +conn.query['limit'] || 1
        type = conn.query['type'] || 'all'
        # summary | title | all
    cur = db.find 'Post', {type: 'article'}
    cnt_str = if type is 'summary' then 'summary' else if type is 'all' then 'body' else ''
    cur.sort({createDate: -1}).select("_id title tags createDate #{cnt_str}").skip(start).limit(limit)

    cur.exec (err, row) ->
        if err
            conn.send 'err', {
                err: 500
                message: err
            }
        conn.send 'json', row
