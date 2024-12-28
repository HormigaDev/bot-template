import colors from 'chalk';
import { bot } from '../bot';
import { RawCommand } from '@/interfaces/RawCommand';
import { ChannelType, Events, Message } from 'discord.js';

bot.on(Events.MessageCreate, async (message: Message) => {
    if (message.author.bot) return;
    if (message.channel.type === ChannelType.DM) return;
    let args = message.content
        .slice((process.env.PREFIX || '!').length)
        .trim()
        .split(/ +/g);
    let command = args.shift()?.toLocaleLowerCase() || '';
    if (!command) return;
    try {
        const cmd = bot.commands.raw.find((c: unknown) => {
            const cmd = c as RawCommand;
            return cmd.name.toLocaleLowerCase() === command || cmd.alias.includes(command);
        }) as RawCommand;
        if (!cmd) return;
        await cmd.execute(bot, message, args);
    } catch (err) {
        console.log(
            colors.red(
                "Ocurrió un error al intentar ejecutar el comando '{}': ".replace('{}', command),
            ),
            err,
        );
    }
});
