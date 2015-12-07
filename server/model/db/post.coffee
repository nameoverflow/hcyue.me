model = require './model'
post = model.post

base_cnt = '_id title tags createDate editDate '

selectList = (cnt, query = type:'article') ->
    cur = post.find query

    cur.sort createDate: -1
        .select base_cnt + cnt

getRanged = (start, limit, cnt, callback) ->
    selectList cnt
        .skip start
        .limit limit
        .exec callback


getSingleById = (id, callback) ->
    post.findOne {_id: id}, callback
getSingleByTitle = (title, callback) ->
    post.findOne {title: title}, callback


article =
    summary: (start, limit, callback) ->
        getRanged start, limit, 'summary break', callback

    title: (start, limit, callback) ->
        getRanged start, limit, '', callback

    timeLine: (start, end, callback) ->
        cur = selectList '', {
            type: 'article'
            createDate:
                $gte: start
                $lte: end
        }
        cur.exec callback
pageList = (start, limit, callback) ->
    cur = selectList '', {
        type: 'page'
    }
    cur.skip start
        .limit limit
        .exec callback
page =

module.exports =
    article: article
    pageList: pageList
    singleById: getSingleById
    singleByTitle: getSingleByTitle
