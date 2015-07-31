fs = require 'fs'
conf =
    'PATH_ROOT': 'tmp/'
    'MAX_AGE': 60*60*24*7


gID = () ->
    new Date().getTime() + Math.ceil Math.random() * 1000

createSession = (cur_session, setCookie, callback) ->
    cur_session._data = 
        'creatTime': new Date()
        'auth': 'guest'
    setCookie {
        'sid': cur_session.sid
        'path': '/'
        'Max-Age': conf['MAX_AGE']
        'HttpOnly': true
    }
    fs.writeFileSync cur_session.file_path, JSON.stringify cur_session._data
    callback && callback()

delSessionFile = (session, callback) ->
    fs.unlink session.file_path, () ->
        if err
            callback && callback(err)
        callback && callback()
###
destroySession = (conn, callback) ->
    if not conn._session
        callback && callback("No Session Exists")
        return
    delSessionFile conn._session, () ->
        delete conn['_session']
        callback && callback()
###
###
connect.session

methods:
    get() 获取当前连接session信息
    set(data) 设置session，写入cookie
###

###
session数据
auth: 权限，'admin' 'guest'

###
class Session
    constructor: (cookie, setCookie, callback) ->
        @sid = if cookie['sid'] then cookie['sid'] else gID()
        @file_path = conf['PATH_ROOT'] + @sid
        cur_session = this

        fs.exists @file_path, (exists) ->
            # console.log 'file judge'
            if exists
                # console.log 'file exists'
                fs.readFile cur_session.file_path, 'UTF-8', (err, file) ->
                    # console.log 'file opened'
                    if err
                        callback && callback err
                    data = JSON.parse file
                    # console.log 'data parsed'
                    if +new Date() / 1e3 - (+data.creatTime) > conf['MAX_AGE']
                        # console.log 'session died'
                        delSessionFile cur_session, () ->
                            # console.log 'create new session'
                            createSession cur_session, setCookie, callback
                    # console.log 'paesed data:', data
                    cur_session._data = cur_session._data || {}
                    for k, v of data
                        cur_session._data[k] = v
                        # console.log "data:#{v} setted as #{k}"
                    # console.log 'data all setted'
                    # console.log cur_session
                    callback && callback()
            else
                createSession cur_session, setCookie, callback


    get: (name) ->
        # console.log 'session', @
        if name
            return (@_data[name] || null)
        return @_data

    set: (data) ->
        cur_session = @
        for k, v of data
            @_data[k] = v
        @_data['creatTime']= new Date()

        fs.writeFileSync cur_session.file_path, JSON.stringify @_data

    destroySession: (callback) ->
        cur_session = @
        delSessionFile conn._session, () ->
            delete cur[_session]
            callback && callback()


module.exports.session = Session
