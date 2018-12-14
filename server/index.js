const app = require('express')();
const http = require('http').Server(app);
const dataLogo = require('./dataLogo');

const io = require('socket.io')(http);

const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/dataLogo', (req, res) => {
  res.send(dataLogo.logoPositions);
});

setInterval(function () {
    dataLogo.updateLogo();
    io.sockets.emit('dataLogo', dataLogo.logoPositions[0]);
    console.log(`Emitiendo ${dataLogo.logoPositions[0]} `);
}, 5000);

io.on('connection', function (socket) {
    console.log('a user connected');
  });

http.listen(port, () => {
  console.log(`Listening on *:${port}`);
});