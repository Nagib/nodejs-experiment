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

var ball = {
  x: 100,
  y: 0
}

io.sockets.on('connection', function (socket) {
  setInterval(function () {
    socket.emit('set_pos', ball);
  }, 100);

  socket.on('get_pos', function (data) {
    ball = data;
  });

    /*
    socket.on('set_pos', function (data) {
      ball = data;
    });
    */
});