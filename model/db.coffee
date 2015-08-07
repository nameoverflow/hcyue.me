mong = require 'mongoose'

db_uri = 'mongodb://localhost/blog'

db = mong.connection

db.on 'error', (err) ->
    console.log "Mongoose connection error: #{err}"

db.on 'connnected', () ->
    console.log 'Mongoose connected'

db.on 'disconnnected', () ->
    console.log 'Mongoose disconnected'


process.on 'SIGINT', () ->
    mong.connection.close () ->
        console.log 'Mongoose disconnected through app termination'
        process.exit(0)

mong.connect db_uri

Schema = mong.Schema

postSchema = new Schema {
    title: String
    summary: String
    body: String
    createDate: {
        type: Date
        default: Date.now
    }
    editDate: {
        type: Date
        default: Date.now
    }
    tags: [String]
    ###
    type: 'article'|'page'
    ###
    type: String
}

mong.model 'Post', postSchema

module.exports.findById = findById = (model_name, id, callback) ->

    (mong.model model_name).findOne {_id: id}, (err, doc) ->
        if err
            callback err, null
            return
        callback null, doc


module.exports.add = (model_name, data, callback) ->
    newDoc = new (mong.model model_name)(data)
    newDoc.save (err, doc) ->
        if err
            callback err, null
            return
        callback null, doc

module.exports.find = (model_name, condi, callback) ->
    return (mong.model model_name).find condi

module.exports.update = (model_name, condi, data, callback) ->
    data['editDate'] = new Date()
    (mong.model model_name).update condi, data, (err, raw) ->
        if err
            callback err, null
            return
        callback null, raw

