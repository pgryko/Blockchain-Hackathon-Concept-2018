//Socket io stuff
import SocketIo from 'socket.io';

import busboy from 'connect-busboy';

import SocketEvents from './socketio'

/*
 Import from Jason's Socket io implementation, this needs to be refactored
 */

// Application state.
var state = {
  title: 'Unipart Digital Comm Cell',
  items: [],
  selection: false,
  users: [],
};

export default (app, server) =>{

  app.use(busboy());

  var io = new SocketIo(server, {path: '/api/chat'});

  SocketEvents(io,state, app);
}
