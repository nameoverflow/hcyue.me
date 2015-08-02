fs = require 'fs'
zlib = require 'zlib'

config = (require './config').staticFile
###
    type:
        html: 'text/html'
        js: 'application/x-javascript'
        json: 'application/json'
        css: 'text/css'
        ico: 'image/x-icon'
        jpg: 'image/jpeg'
        png: 'image/png'
        gif: 'image/gif'
        rar: 'application/zip'
        zip: 'application/zip'
        pdf: 'application/pdf'
        txt: 'text/plain'

    maxAge: 60 * 60 * 24 * 365
    compress :
        match: /css|js|html/ig
###

###
Example:
    app.get('/public/*', static_file(public))
###
module.exports = (static_path) ->
    ###
    @param {Str} static_path Path to static files folder
    ###
    return (conn, params) ->
        res_header = 
            'server': 'black-tech'
            'Connection': 'keep-alive'
            'charset' : 'utf-8'

        if not params.path
            conn.send 'html', 'static file route need * at the end of uri'
            return

        # When path includes '/../'
        if params.path.match /\.\./g
            conn.send 'html', '<p>少年你很有想法</p><p>Do you wanna make big news?</p>'

        file_path = static_path + '/' + params.path
        console.log file_path

        # Get Content-Type
        file_name = (params.path.split '/').pop()
        ext = (file_name.split '.').pop()
        # content_type = 
        res_header['Content-Type'] = config.type[ext] || 'text/plain'

        # Now do the cache control
        fs.stat file_path, (err, stat) ->
            if not stat
                conn.send 'define', '<html>not found!</html>', {
                    'status': 404
                    'Content-Type': 'text/html'
                }
                return
            if err
                conn.send 'define', 'server error', {status: 500}

            lastModified = stat.mtime.toUTCString()

            IMS = conn.request.headers['if-modified-since']

            if IMS and lastModified is IMS
                conn.response.writeHead 304, "Not Modified"
                conn.response.end()
                return

            expires = new Date()
            expires.setTime expires.getTime() + config.maxAge * 1000
            res_header["Expires"] = expires.toUTCString()
            res_header["Cache-Control"] = "max-age=" + config.maxAge

            # Create a read stream, compress

            raw = fs.createReadStream file_path
            acceptEncoding = conn.request.headers['accept-encoding'] || ""

            # If this ext should be compressed
            matched = ext.match config.compress.match

            if matched and acceptEncoding.match /\bgzip\b/
                # Compressing...
                res_header['Content-Encoding'] = 'gzip'
                conn.response.writeHead 200, 'OK', res_header

                (raw.pipe zlib.createGzip()).pipe conn.response

            else if matched && acceptEncoding.match /\bdeflate\b/

                res_header['Content-Encoding'] = 'deflate'
                conn.response.writeHead 200, 'OK', res_header

                (raw.pipe zlib.createDeflate()).pipe conn.response
            else
                conn.response.writeHead 200, 'OK', res_header
                raw.pip conn.response
            
