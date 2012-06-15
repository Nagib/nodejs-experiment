var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var players = {};

io.sockets.on('connection', function (socket) {
  console.log(socket.id);

  players[socket.id] = {
    x: 0,
    y: 0
  }

  socket.emit('set_pos', players);

  /*
  setInterval(function () {
    socket.emit('set_pos', ball);
  }, 100);
  */

  socket.on('disconnect', function () {
    console.log('disconnect!');
    delete players[socket.id];
  });

  socket.on('set_pos', function (data) {
    players[socket.id] = data;
    console.log(players);
    socket.broadcast.emit('set_pos', players);
  });

    /*
    socket.on('set_pos', function (data) {
      ball = data;
    });
    */
});