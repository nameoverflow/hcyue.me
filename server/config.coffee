module.exports = 
    'server':
        'port': 4000


    'staticFile':
        'type':
            'html': 'text/html'
            'js': 'application/x-javascript'
            'json': 'application/json'
            'css': 'text/css'
            'ico': 'image/x-icon'
            'jpg': 'image/jpeg'
            'png': 'image/png'
            'gif': 'image/gif'
            'rar': 'application/zip'
            'zip': 'application/zip'
            'pdf': 'application/pdf'
            'txt': 'text/plain'

        'maxAge': 60 * 60 * 24 * 365
        'compress':
            'match': /css|js|html/ig

    'session':
        'PATH_ROOT': 'tmp/'
        'MAX_AGE': 60*60*24*7

    'dataBase':
        'db': 'blog'
        'host': '127.0.0.1'
        'user': 'root'
        'pass': 'root'
        'port': 27017
        'db_options': 
            'safe': true


