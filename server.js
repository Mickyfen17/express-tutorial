var express = require('express');
var app = express();
var fs = require('fs')

var bodyParser = require('body-parser');
var multer  = require('multer');

// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({ dest: '/tmp/'}));

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + '/' + 'index.html' );
})

app.get('/process_get', function (req, res) {
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.post('/file_upload', function (req, res) {
   console.log(req.files.file.name);
   console.log(req.files.file.path);
   console.log(req.files.file.type);
   var file = __dirname + '/' + req.files.file.name;

   fs.readFile( req.files.file.path, function (err, data) {
      fs.writeFile(file, data, function (err) {
         if( err ){
            console.log( err );
            }else{
               response = {
                  message:'File uploaded successfully',
                  filename:req.files.file.name
               };
            }
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
   });
})

app.post('/', function (req, res) {
   console.log('Got a POST request for the homepage');
   res.send('Hello POST');
})

app.post('/process_post', urlencodedParser, function (req, res) {
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.delete('/del_user', function (req, res) {
   console.log('Got a DELETE request for /del_user');
   res.send('Hello DELETE');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log('Example app listening at http://%s:%s', host, port)
})