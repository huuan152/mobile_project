const io = require('socket.io-client/dist/socket.io');

const socket = io(
   `https://mtapp-a.herokuapp.com/api`,
   {
     transports: ['websocket'], // you need to explicitly tell it to use websockets
   },
 );

 socket.on('connect', () => {
   console.log('connected --------------- socket ---------------');
 });

 socket.on('connect_error', err => {
   console.log(err.message);
 });