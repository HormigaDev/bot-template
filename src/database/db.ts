import colors from 'chalk';
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error(colors.red('No se ha configurado la variable de entorno MONGO_URI'));
}

const client = new MongoClient(MONGO_URI);

export async function initDatabase() {
    try {
        await client.connect();
        console.log(colors.yellow('Conectado a Mongo Atlas'));
        const database = client.db();
        return database;
    } catch (err) {
        console.log(
            colors.red('Ocurrió un error al intentar conectarse a la base de datos: '),
            err,
        );
    }
}
