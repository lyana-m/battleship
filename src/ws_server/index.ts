import { WebSocketServer } from 'ws';
import { ExtendedWS, Request } from './types';
import { DB } from './db';
import { messageHandler } from './handlers/messageHandler';
import {generateRandomNumber} from './helpers/generateRandomNumber';

const PORT = process.env.WS_PORT || 3000;

const wss = new WebSocketServer({ port: +PORT });
const db = new DB();

wss.on('connection', function connection(ws: ExtendedWS) {
  ws.connectionId = generateRandomNumber();
  db.addConnection(ws);

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    try {
      const req = JSON.parse(data.toString()) as Request;
      messageHandler(req, ws, db);
    } catch(e) {
      console.log(e);
      ws.send(JSON.stringify('Data should be in JSON format'));
      ws.close();
    }

    console.log('received: %s', data);
  });

  console.log(`Start ws server on the ${PORT} port!`);
});
