# 
# 
# 
module.exports = (conn, next) ->
    conn.session (session) =>
        if (session.get 'auth') isnt 'admin'
            conn.send 'jump', '/admin/login'
        else
            next()