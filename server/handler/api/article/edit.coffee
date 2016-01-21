marked = require 'marked'

db = require '../../../model/db/model'
auth = require '../../../model/auth'
dbCb = require './handlePost'

post = db.post
module.exports = (conn, params) ->
    callback = dbCb conn
    auth conn, () ->
        post_data =
            'title': conn.body['title']
            'body': marked conn.body['body']
            'bodySource': conn.body['body']
            'summary': marked (conn.body['body'].split '<!--more-->')[0]
            'break': if (conn.body['body'].split '<!--more-->')[1] then true else false
        if conn.body['type'] then post_data['type'] = conn.body['type']
        if conn.body['tags'] then post_data['tags'] = conn.body['tags'].split(';')

        if !conn.query || (conn.query['post'] is 'new')
            conn.query && conn.query['page'] && post_data['type'] = 'page'
            post.add post_data, callback
        else
            post_id = conn.query['post']
            post_data['editDate'] = Date.now()
            post.update {_id: post_id}, post_data, callback
