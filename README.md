# yue.js

yue.js is a micro web server based on Node.js and CoffeeScript, supporting `route`, `session`, `database (based on mongodb and is not completed yet..` and `static file`.

### Example

In `site.coffee`

### `connection` object

`connection` is a encapsulation of http requests and server responses.

#### Methods

`send type[, data[, option]]` send data as response

param `type`  String, ['html', 'json', 'define']

param `data`  String or object, which will be send as response

param `option`  Object, Only needed when `type` is 'define'. Keys can be `'Content-Type', 'status'`.

`getCookie` get cookies of current request.Return a cookie object.

`setCookie cookie_data` set cookies of this response

param `cookie_data`  Object

`session callback` would open session of this connection. If session isnt existed will create one.

`callback` will recieve a `session` object.

### Routes

```coffee-script
app.get uri, callback
```

### Session

to be compeleted.......
