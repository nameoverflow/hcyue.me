module.exports = (conn, params) ->
    conn.session (session) ->
        # console.log session
        session.get 'times' || session.set {'times': 0}
        session.set {'times': (session.get 'times') + 1}
        conn.send 'html', "hello,#{session.get 'auth'}, #{session.get 'times'}"
