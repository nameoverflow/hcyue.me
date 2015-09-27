db = require 'model/db.coffee'
marked = require 'marked'

post_data =
    'title': 'About'
    'body': marked conn.body['body']
    'bodySource': conn.body['body']
    'summary': marked (conn.body['body'].split '<!--more-->')[0]
    'break': if (conn.body['body'].split '<!--more-->')[1] then true else false
