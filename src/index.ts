import dotenv from 'dotenv';
dotenv.config();
import { server } from './server';
import { bot } from './bot';
import { TextCommandsHandler } from './handlers/text.handler';
import { SlashCommandsHandler } from './handlers/slash.handler';
import { EventsHandler } from './handlers/events.handler';
import { Client } from 'discord.js';
// import { connectDB } from './database/db';

const client = new Client({ intents: [3276799] });

async function main() {
    /**
     * Si deseas utilizar el MongoDB configurado en src/database/db.ts
     * Puedes descomentar el siguiente trecho de código.
     */
    // await connectDB();

    // Cargar los comandos
    TextCommandsHandler(bot);
    SlashCommandsHandler(bot);

    //Levantar el servidor
    server.listen(server.get('port'), () => {
        console.log('El bot está corriendo en el puerto: {}'.replace('{}', server.get('port')));
    });
}
EventsHandler(client);

if (!process.env.TOKEN) {
    throw new Error(
        'El token del bot no ha sido definido en las variables de entorno o en el archivo .env',
    );
}

//Iniciar el bot
client.login(process.env.TOKEN);

main();
