db = require '../../model/db'
render = require '../../model/render'

getTmpData = (id, row) ->
    if id is 'new' then {
        post: id
        title: ''
        content: ''
    } else {
        post: id
        title: row['title']
        content: row['bodySource'] || row['body']
        tags: row['tags'].join(';')
    }

module.exports = (conn, params) ->
    conn.session (session) ->
        if (session.get 'auth') isnt 'admin'
            conn.send 'jump', '/admin/login'
        else
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
                        conn.send 'err', {
                            err: 500
                            message: err
                        }
                    conn.send 'html', render './view/admin/edit.jade', getTmpData params['post'], row
