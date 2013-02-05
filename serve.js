var express = require('express')
var app = express()
var fs = require('fs')
app.use(express.static(__dirname))
app.use(express.logger())
app.get('/examples/*', function(req, res) {
                   console.log('sdfsdf')
  res.type('html');

  fs.createReadStream(__dirname + '/examples/index.html').pipe(res)
})
app.listen(9090)
