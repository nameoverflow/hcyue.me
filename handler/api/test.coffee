db = require '../../model/db.coffee'

module.exports = (conn, params) ->
    db.add 'Post', {
        'title': 'hello world'
        'summary': '<p>lalalalala</p>'
        'body': '<p>我能吞下玻璃而不伤身体</p>'
        'tags': ['omg', 'fuck']
        'type': 'article'
    }, (err, doc) ->
        conn.send 'json', doc