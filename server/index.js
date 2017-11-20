const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const http = require('http');
const app =express();

var mlab = "mongodb://stock:password@ds113936.mlab.com:13936/stock_market"

var promise = mongoose.connect(mlab,{
  useMongoClient: true
  /* other options */

});

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
var server = app.listen(process.env.PORT || 4000, function(){
    console.log('listening for requests on port 4000');
});



var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);
    socket.on('add', function(data){
    io.sockets.emit('add', data);
  });
  socket.on('delete', function(id){
    io.sockets.emit('delete', id)
  })

});
app.use('/api', require('./routes/api'));

//init app
//build part of the react app
//uncoment this after npm build
app.use('/', express.static(path.join(__dirname, '../build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

//err
app.use(function(err, req, res, next){
  //console.log(err);
  res.status(422).send({error: err.message})
});

//port
