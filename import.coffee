fs = require 'fs'
yaml = require 'js-yaml'
mong = require 'mongoose'
marked = require 'marked'

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
    bodySource: String
    createDate: {
        type: Number
        default: Date.now
    }
    editDate: {
        type: Number
        default: Date.now
    }
    tags: {
        type: [String]
        default: []
    }
    ###
    type: 'article'|'page'
    ###
    type:  {
        type: String
        default: 'article'
    }
    break: {
        type: Boolean
        default: false
    }
}

mong.model 'Post', postSchema

Post = mong.model 'Post'

files = fs.readdirSync './_posts'

for i in files

    data = fs.readFileSync './_posts/'+ i, 'utf8'
    parts = data.split '\n---\n'

    info = yaml.safeLoad parts[0]
    body = parts[1]

    summ = (body.split '<!--more-->')[0]

    post_data =
        'title': info['title']
        'createDate': info['date'].getTime()
        'body': marked body
        'bodySource': body
        'summary': marked summ
        'type': 'article'
        'tags': info['tags'] || []
        'break': if (body.split '<!--more-->')[1] then true else false

    console.log info['date'].getTime()
    # Post.create post_data, (err, doc) =>
    #     console.log "#{info['title']} finished"
    #     console.log "#{doc}"

mong.disconnect()
