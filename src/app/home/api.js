import openSocket from 'socket.io-client';
const  socket = openSocket();
export function subscribeStock(cb) {
  socket.on('add', timestamp => cb(null, timestamp));
}

export function subscibeDelete(cb) {
  socket.on('delete', id => cb(null, id))
}
