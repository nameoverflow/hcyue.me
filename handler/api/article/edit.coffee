db = require '../../../model/db.coffee'
marked = require 'marked'


module.exports = (conn, params) ->
    dbCb = ((conn) ->
        (err, doc) ->
            console.log 'accepted', doc
            if err
                console.log err
                return conn.die {
                    err: 500
                    message: err
                }
            return conn.send 'jump', '/admin')(conn)

    conn.session (session) ->
        if (session.get 'auth') isnt 'admin'
            conn.send 'define', '/admin/login'
        else
            post_data =
                'title': conn.body['title']
                'body': marked conn.body['body']
                'bodySource': conn.body['body']
                'summary': marked (conn.body['body'].split '<!--more-->')[0]
                'break': if (conn.body['body'].split '<!--more-->')[1] then true else false
            if conn.body['type'] then post_data['type'] = conn.body['type']
            if conn.body['tags'] then post_data['tags'] = conn.body['tags'].split(';')

            if !conn.query || (conn.query['post'] is 'new')
                db.add 'Post', post_data, dbCb
            else
                post_id = conn.query['post']
                post_data['editDate'] = Date.now()
                db.update 'Post', {_id: post_id}, post_data, dbCb
