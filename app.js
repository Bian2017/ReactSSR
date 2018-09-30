
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send(`<html>
      <head>
        <title>hello</title>
      </head>
      <body><h1>hello world</h1></body>
    </html>`)
})

var server = app.listen(4068)