db = require '../../model/db.coffee'

module.exports = (conn, params) ->
    db.add 'Post', {
        'title': '你好世界hello world测试文章'
        'summary': '<p>lalalalala</p><p>这是一个测试</p>'
        'body': '<p>我能吞下玻璃而不伤身体</p><p>Single Dog Single Dog Single All The Day</p>'
        'tags': ['omg', 'fuck']
        'type': 'article'
    }, (err, doc) ->
        conn.send 'json', doc
