mongodb = require 'mongodb'

conf = (require '../config').dataBase
###
    'db': 'blog'
    'host': '127.0.0.1'
    'user': 'root'
    'pass': 'root'
    'port': 27017
    'db_options': {safe: true}
###

class Connect
    ###
    Connect类
    ###
    constructor: () ->
        server = new mongodb.Server conf.host, conf.port, {auto_reconnect:true}
        @_db = new mongodb.Db conf.db, server, db_options


    openColle: (coll_name, callback) ->
        ###
        @param {Str} coll_nam
        @param {Fun} callback
        @return void
        @public
        ###
        connect = @
        if @state is 'close'
            @_db.open (err, client) ->
                if err
                    callback && callback 'Error when open datebase'
                    return false
                connect.state = 'open'
                connect.authenticate conf.user, conf.pass, (err, result) ->
                    if err
                        callback && callback 'Authorize failed'
                        return false
                    colle = connect.db.collection(coll_name, db_options)
                    callback && callback undefined, colle
        else
            @_db.authenticate conf.user, conf.pass, (err, result) ->
                if err
                    callback && callback 'Authorize failed'
                    return false
                colle = connect.db.collection(coll_name, db_options)
                callback && callback undefined, colle

    close: () ->
        @_db.close()
        connect.state = 'close'
    ###
    getData: (query, option, callback) ->
        if not callback
            callback = option
            option = {}
        option.sort = option.sort || 1
        option.limit = option.limit || 1
        option.keyOrList = option.keyOrList

        @_db._openColle (err, colle) ->
            if err
                return false
            data_array = colle.find(query).sort()
    ###
