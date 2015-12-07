
module.exports = (err, doc) =>
    console.log 'accepted', doc
    if err
        console.log err
        return conn.die {
            err: 500
            message: err
        }
    return conn.send 'jump', '/admin'
