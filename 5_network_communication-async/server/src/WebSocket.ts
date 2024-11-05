import { WebSocketServer } from 'ws';
import Logger from './lib/logger';

export default (l: Logger) => {
    l.start('Starting WebSocket server');

    const wss = new WebSocketServer({ port: 5556 });

    wss.on('connection', (client) => {
        console.log(client);
    });

    wss.on('listening', () => {
        l.stop('WSServer started on 5556');
    });

    wss.on('error', (err) => {
        l.error(err);
    });
};
