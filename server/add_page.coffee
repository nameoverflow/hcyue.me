db = require 'model/db/model'
marked = require 'marked'

post = db.post
post_data =
    'title': 'About'
    'body': marked conn.body['body']
    'bodySource': conn.body['body']
    'summary': marked (conn.body['body'].split '<!--more-->')[0]
    'break': if (conn.body['body'].split '<!--more-->')[1] then true else false
