import express, { Request, Response } from 'express';
import cors from 'cors';

export const server = express();

server.use(cors());

server.set('port', 3000);

server.get('/', (req: Request, res: Response) => {
    res.status(200).send('El bot está operativo!');
});
