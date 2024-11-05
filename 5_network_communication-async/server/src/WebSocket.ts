import { WebSocketServer } from 'ws';
import Logger from './lib/logger';

export default (l: Logger) => {
    l.start('Starting WebSocket server');

    const wss = new WebSocketServer({ port: 5556 });

    wss.on('connection', (client) => {
        client.on('message', (data) => {
            const str = data.toString('utf8');
            if (str === '/end') return client.close();

            client.send(str);
        });

        setTimeout(() => {
            client.send('==============================================');
            client.send('Welcome to my Echo WebSocketServer.');
            client.send('Send something, and I will send it back');
            client.send('Send text /end and I will end connection with you');
            client.send('==============================================');
        }, 100);
    });

    wss.on('listening', () => {
        l.stop('WSServer started on 5556');
    });

    wss.on('error', (err) => {
        l.error(err);
    });
};
