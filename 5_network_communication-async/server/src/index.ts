import Logger from './lib/logger';
import express from './Express';
import websocket from './WebSocket';

//logger for main messages
const l = new Logger('Examples', 'cyan');
l.start('Starting examples');
express(new Logger('Express', 'yellow'));
websocket(new Logger('WebSocket', 'magenta'));
l.stop('Done');
