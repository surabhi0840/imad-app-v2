var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var config=
{
    user:'surabhi0840',
    database:'surabhi0840',
    host:'db.imad.hasura.app.io',
    port:'5432',
    password: process.env.DB_VARIABLE,
};
var pool= new pool(config);
var app = express();
app.use(morgan('combined'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/article-one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});
app.get('/article-two', function (req, res) {
res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));  
});
app.get('/article-three', function (req, res) {
res.sendFile(path.join(__dirname, 'ui', 'article-three.html')); 
});
app.get('/test-db', function (req, res) {
  pool.query('SELECT * from test',function(err,result){
      if(err){
          res.status(500).send(err.tostring());
      }
      else{res.send(JSON.stringify(result.rows));
  }
});
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
