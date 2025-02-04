import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import { Bot } from '@/bot';
import { readdirSync } from 'fs';
import { join } from 'path';
import { SlashCommand } from '@/types/SlashCommand';

export const SlashCommandsHandler = (bot: Bot) => {
    if (!process.env.TOKEN) {
        throw new Error(
            'El token del bot no está definido en las variables de entorno o en el archivo .env',
        );
    }
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    return new Promise(async (resolve, _) => {
        const files = readdirSync(join(__dirname, '../commands/slash/')).filter((f) =>
            f.endsWith('.ts'),
        );
        const data = [];
        for (const file of files) {
            const { cmd }: { cmd: SlashCommand } = await import(
                join(__dirname, '../commands/slash/', file)
            );
            data.push(cmd.data.toJSON());
            bot.commands.slash.set(cmd.name, cmd);
        }
        try {
            console.log('Iniciando carga de comandos de barra');
            if (!process.env.CLIENT_ID) {
                throw new Error(
                    'El ID del bot no ha sido definido en las variables de entorno o el archivo .env',
                );
            }
            await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: data });
            console.log('Comandos de barra cargados correctamente!');
        } catch (err) {
            console.log('Error al actualizar los comandos de barra: ', err);
        }
        resolve(true);
    });
};
