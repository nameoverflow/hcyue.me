mong = require 'mongoose'
yaml = require 'js-yaml'
fs = require 'fs'
conf = (require '../../config').site.db

db = mong.connection

db.on 'error', (err) ->
    console.log "Mongoose connection error: #{err}"

db.on 'connnected', () ->
    console.log 'Mongoose connected'

db.on 'disconnnected', () ->
    console.log 'Mongoose disc    summary: String
onnected'


process.on 'SIGINT', () ->
    mong.connection.close () ->
        console.log 'Mongoose disconnected through app termination'
        process.exit(0)

mong.connect conf.url

Schema = mong.Schema

postSchema = new Schema {
    title: String
    summary: String
    body: String
    bodySource: String
    createDate:
        type: Number
        default: Date.now
    editDate:
        type: Number
        default: Date.now
    tags:
        type: [String]
        default: []
    ###
    type: 'article'|'page'
    ###
    type:
        type: String
        default: 'article'
    break:
        type: Boolean
        default: false
}

post = mong.model 'Post', postSchema

module.exports =
    post: post

# module.exports.findById = (model_name, id, callback) ->
#     (mong.model model_name).findOne {_id: id}, callback
#
# module.exports.add = (model_name, data, callback) ->
#     (mong.model model_name).create data, callback
#
# module.exports.find = (model_name, condi, callback) ->
#     (mong.model model_name).find condi
#
# module.exports.update = (model_name, condi, data, callback) ->
#     (mong.model model_name).update condi, data, callback
#
# module.exports.rm = (model_name, condi, callback) ->
#     (mong.model model_name).remove condi, callback
