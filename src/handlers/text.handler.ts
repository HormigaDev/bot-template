import { readdirSync } from 'fs';
import { join } from 'path';
import { Bot } from '@/bot';
import { TextCommand } from '@/types/TextCommand';

const getFilesRecursively = (dir: string): string[] => {
    let files: string[] = [];
    for (const file of readdirSync(dir, { withFileTypes: true })) {
        const fullPath = join(dir, file.name);
        if (file.isDirectory()) {
            files = files.concat(getFilesRecursively(fullPath));
        } else if (file.name.endsWith(process.env.NODE_ENV === 'development' ? '.ts' : '.js')) {
            files.push(fullPath);
        }
    }
    return files;
};

export const TextCommandsHandler = async (bot: Bot) => {
    console.log('Iniciando carga de comandos de texto...');
    const commandDir = join(__dirname, '../commands/text');
    const files = getFilesRecursively(commandDir);

    for (const file of files) {
        const { cmd }: { cmd: TextCommand } = await import(file);
        bot.commands.text.set(cmd.name, cmd);
    }

    console.log('Comandos de texto cargados!');
};
