import colors from 'chalk';
import dotenv from 'dotenv';
dotenv.config();
import { server } from './server';
import { bot } from './bot';
import { RawCommandsHandler } from './handlers/raw.handler';
import { SlashCommandsHandler } from './handlers/slash.handler';
import { EventsHandler } from './handlers/events.handler';
import { initDatabase } from './database/db';

async function main() {
    /**
     * Si deseas utilizar el MONGO ATLAS configurado en src/database/db.ts
     * Puedes descomentar el siguiente trecho de código.
     */

    const db = await initDatabase();

    // Cargar los comandos
    RawCommandsHandler(bot);
    SlashCommandsHandler(bot);
    EventsHandler();

    //Levantar el servidor
    server.listen(server.get('port'), () => {
        console.log(
            colors.green(
                'El bot está corriendo en el puerto: {}'.replace('{}', server.get('port')),
            ),
        );
    });

    if (!process.env.TOKEN) {
        throw new Error(
            colors.red(
                'El token del bot no ha sido definido en las variables de entorno o en el archivo .env',
            ),
        );
    }

    //Iniciar el bot
    bot.login(process.env.TOKEN);
}

main();
