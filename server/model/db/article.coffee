model = require './model'
post = model.post

base_cnt = '_id title tags createDate '

selectList = (cnt, query = type:article) ->
    cur = post.find query

    cur.sort createDate: -1
        .select base_cnt + cnt

getRanged = (start, limit, cnt, callback) ->
    selectList cnt
        .skip start
        .limit limit
        .exec callback

exports = module.exports = article = {}

article.getSummary = (start, limit, callback) ->
    getRanged start, limit, 'summary break', callback

article.getTitles = (start, limit, callback) ->
    getRanged start, limit, '', callback

article.getTimeLine = (start, end, callback) ->
    cur = selectList '', {
        type: article
        createDate:
            $gte: start
            $lte: end
    }
    cur.exec callback
