db = require '../../model/db'
render = require '../../model/render'
auth = require '../../model/auth'

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
    auth conn, () =>
        # content =
        #     post: params['post']
        if params['post'] is 'new'
            tmp = getTmpData params['post']
            if conn.query && conn.query['page']
                tmp['page'] = true
            conn.send 'html', render './view/admin/edit.jade', tmp
        else
            db.findById 'Post', params['post'], (err, row) ->
                if err
                    conn.die,
                        err: 500
                        message: err

                conn.send 'html', render './view/admin/edit.jade', getTmpData params['post'], row
