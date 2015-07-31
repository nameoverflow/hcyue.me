module.exports = (conn, params) ->
    conn.send 'html', '<html>hello world!</html>'