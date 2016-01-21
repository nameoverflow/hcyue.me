db = require '../../model/db/model'
render = require '../../model/render'
auth = require '../../model/auth'
post = db.post

getTmpData = (id, row) ->
    if id is 'new'
        post: id
        title: ''
        content: ''
    else
        post: id
        title: row['title']
        content: row['bodySource'] || row['body']
        tags: row['tags'].join(';')

module.exports = (conn, params) ->
    render conn
    auth conn, () =>
        # content =
        #     post: params['post']
        if params['post'] is 'new'
            tmp = getTmpData params['post']
            if conn.query && conn.query['page']
                tmp['page'] = true
            conn.view 'admin/edit', tmp
        else
            post.findOne {_id: params['post']}, (err, row) ->
                if err
                    conn.die
                        err: 500
                        message: err

                conn.view 'admin/edit', getTmpData params['post'], row
