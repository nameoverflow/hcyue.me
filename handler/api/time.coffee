db = require '../../model/db'

module.exports = (conn, params) ->
    cur = db.find 'Post', {type: 'article'}
    cur.sort({createDate: 1}).select('createDate').limit(1)
    cur.exec (err, doc) ->
        fuck = new Date(doc[0]['createDate']).getFullYear()
        conn.send 'json', [new Date().getFullYear()..fuck]
