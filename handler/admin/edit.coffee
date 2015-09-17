db = require '../../model/db'
render = require '../../model/render'

module.exports = (conn, params) ->
    conn.session (session) ->
        if (session.get 'auth') isnt 'admin'
            conn.send 'jump', '/admin/login'
        else
            content =
                post: params['post']

            if params['post'] is 'new'
                content['title'] = ''
                content['content'] = ''
                conn.send 'html', render './view/admin/edit.jade', content
            else
                db.findById 'Post', params['post'], (err, row) ->
                    if err
                        conn.send 'err', {
                            err: 500
                            message: err
                        }
                    console.log row
                    content['title'] = row['title']
                    content['content'] = row['bodySource'] || row['body']
                    conn.send 'html', render './view/admin/edit.jade', content
