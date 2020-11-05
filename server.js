// var http = require('http');
// var fs = require('fs');

// http
//   .createServer(function (req, res) {
//     res.writeHead(200, {
//       'Content-Type': 'text/html',
//       'Access-Control-Allow-Origin': '*',
//     });
//     var readStream = fs.createReadStream(__dirname + '/index.html');
//     readStream.pipe(res);
//   })
//   .listen(1337);

// console.log('Visit me at http://localhost:1337');

var express = require('express');
var app = express();
var path = require('path');
var adminRouter = express.Router();

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app
  .route('/login')
  .get(function (req, res) {
    res.send('this is the login form');
  })
  .post(function (req, res) {
    res.send('processing the login form!');
  });

adminRouter.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

adminRouter.get('/', function (req, res) {
  res.send('I am ADMIN in the dashboard!');
});

adminRouter.get('/users', function (req, res) {
  res.send('i show all the users!');
});

adminRouter.get('/posts', function (req, res) {
  res.send('i show all the posts');
});

adminRouter.get('/users/:name', function (req, res) {
  res.send('hello ' + req.params.name + ' !');
});

app.use('/admin', adminRouter);

app.listen(1337);
