db = require '../../../model/db.coffee'

module.exports = (conn, params) ->
    query_data =
        type: 'article'
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

        if conn.query['st'] or conn.query['et']
            query_data['createDate'] = {}
        if conn.query['st']
            query_data['createDate']['$gte'] = +conn.query['st']
        if conn.query['et']
            query_data['createDate']['$lte'] = +conn.query['et']
    console.log query_data
    cur = db.find 'Post', query_data
    cnt_str = if type is 'summary' then 'summary break' else if type is 'all' then 'body editDate' else ''
    cur.sort({createDate: -1})
        .select("_id title tags createDate #{cnt_str}")
        .skip(start)
        .limit(limit)
        .exec (err, row) ->
            if err
                conn.send 'err', {
                    err: 500
                    message: err
                }
            conn.send 'json', row
