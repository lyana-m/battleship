import { WebSocketServer } from 'ws';
import { ExtendedWS, Request } from './types';
import { DB } from './db';
import { messageHandler } from './handlers/messageHandler';
import { generateRandomNumber } from './helpers/generateRandomNumber';

const PORT = process.env.WS_PORT || 3000;

const wss = new WebSocketServer({ port: +PORT });
const db = new DB();

const stopServer = () => {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.close();
    }
  });
  wss.close();
};

wss.on('connection', function connection(ws: ExtendedWS) {
  ws.connectionId = generateRandomNumber();
  db.addConnection(ws);

  ws.on('message', function message(data) {
    try {
      const req = JSON.parse(data.toString()) as Request;

      console.log('received command: %s', req.type);
      console.log('received data: %s', req.data);

      messageHandler(req, ws, db);
    } catch (e) {
      console.log(e);
      ws.send(JSON.stringify('Data should be in JSON format'));
      ws.close();
    }


  });

  ws.on('error', (error: Error) => {
    stopServer();
    console.log(error);
  });

  ws.on('close', () => {
    console.log(`Ws connection with id ${ws.connectionId} has been closed`);
  });

  console.log(`New ws connection with id ${ws.connectionId}`);
});

console.log(`Start ws server on the ${PORT} port!`);

process.on('SIGINT', () => {
  stopServer();
  console.log('\nWebSocket server stopped.');
  process.exit();
});
