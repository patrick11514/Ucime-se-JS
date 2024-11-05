import Logger from './lib/logger';
import express from 'express';
import crypto from 'node:crypto';

const Names: Record<string, string> = {};

const facts = [
    'From our perspective, the sun and the moon has same size on sky, thats why total solar eclipse can happen.',
    'Andromeda Galaxy will colide with our galaxy, at some point.',
    'Did you know, that 1kg of feathers is same wight as 1kg of steel?',
    'Universe is beautiful.',
    '*Enter new fact*',
    'Factory must grow!!',
    'Never gonna give you up :)',
    'Have a wonderful day',
    'For better approximation of pi, you can juse 22/7 instead of 3.14'
];

export default (l: Logger) => {
    //logger for main messages
    l.start('Starting Express Server');

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded());

    app.get('/', (_, res) => {
        res.send('Hello ^^');
    });

    app.get('/hello', (_, res) => {
        res.send('Hello from my server at ' + Date.now());
    });

    app.get('/json', (_, res) => {
        const data = {
            where: '127.0.0.1',
            when: Date.now(),
            randomFact: facts[Math.floor(Math.random() * facts.length)]
        };

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
    });

    app.get('/name/:name?', (req, res) => {
        res.send(`Hi ${req.params.name ?? 'somebody'}`);
    });

    app.post('/getHash', (req, res) => {
        const { body } = req.body;
        const name: string | undefined = body.name;
        const code: string | undefined = body.code;

        res.setHeader('Content-Type', 'application/json');

        if (!name || !code)
            return res.send(
                JSON.stringify({
                    status: false,
                    message: 'Missing name or code'
                })
            );

        if (typeof name !== 'string' || typeof code !== 'string')
            return res.send(
                JSON.stringify({
                    status: false,
                    message: 'Invalid type of name or code'
                })
            );

        const str = crypto.randomBytes(16).toString('hex');
        const result = Buffer.from(`${name}:${code.split('').toReversed().join('')}:${str}`).toString('base64');

        Names[name] = result;

        res.send(
            JSON.stringify({
                status: true,
                data: str
            })
        );
    });

    app.post('/checkHash', (req, res) => {
        const { body } = req;
        const name: string | undefined = body.name;
        const hash: string | undefined = body.hash;

        res.setHeader('Content-Type', 'application/json');

        if (!hash || !name)
            return res.send(
                JSON.stringify({
                    status: false,
                    message: 'Missing type of hash or name'
                })
            );

        if (typeof hash !== 'string' || typeof name !== 'string')
            return res.send(
                JSON.stringify({
                    status: false,
                    message: 'Invalid hash or name type'
                })
            );

        if (!Names[name])
            return res.send(
                JSON.stringify({
                    status: false,
                    message: 'Invalid name'
                })
            );

        if (Names[name] !== hash)
            return res.send(
                JSON.stringify({
                    status: false,
                    message: 'Invalid hash'
                })
            );

        res.send(
            JSON.stringify({
                status: true
            })
        );
    });

    app.get('/query', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(req.query));
    });

    app.post('/post', (req, res) => {
        res.send(JSON.stringify(req.body));
    });

    app.listen(5555, () => {
        l.stop('Server started on 5555');
    });
};
