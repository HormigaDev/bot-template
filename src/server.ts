import express, { Request, Response } from 'express';
export const server = express();
server.set('port', 3000);
server.get('/', (req: Request, res: Response) => {
    res.status(200).send('El bot está operativo!');
});
