import { WebSocketServer } from 'ws';

const PORT = process.env.WS_PORT || 3000;

const wss = new WebSocketServer({ port: +PORT });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send(JSON.stringify('something'));

  console.log('ws')
});
