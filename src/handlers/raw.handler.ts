import colors from 'chalk';
import { readdirSync } from 'fs';
import { join } from 'path';
import { Bot } from '@/bot';
import { CommandModule } from '@/interfaces/CommandModule';
import { RawCommand } from '@/interfaces/RawCommand';

export const RawCommandsHandler = async (bot: Bot) => {
    const files = readdirSync(join(__dirname, '../commands/raw')).filter((f) => f.endsWith('.ts'));
    console.log(colors.blue('Iniciando carga de comandos de texto...'));
    for (const file of files) {
        const module: CommandModule<RawCommand> = await import(
            join(__dirname, '../commands/raw/', file)
        );
        bot.commands.raw.set(module.default.name, module.default);
    }
    console.log(colors.green('Comandos de texto cargados!'));
};
