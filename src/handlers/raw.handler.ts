import { readdirSync } from 'fs';
import { join } from 'path';
import { Bot } from '@/bot';
import { RawCommand } from '@/types/RawCommand';

export const RawCommandsHandler = async (bot: Bot) => {
    const files = readdirSync(join(__dirname, '../commands/raw')).filter((f) => f.endsWith('.ts'));
    console.log('Iniciando carga de comandos de texto...');
    for (const file of files) {
        const { cmd }: { cmd: RawCommand } = await import(
            join(__dirname, '../commands/raw/', file)
        );
        bot.commands.raw.set(cmd.name, cmd);
    }
    console.log('Comandos de texto cargados!');
};
