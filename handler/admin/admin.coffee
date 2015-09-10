module.exports = (conn, params) ->
    conn.session (session) ->
        if not session.get 'auth'
            conn.send 'jump', '/admin/login'
            return

        
