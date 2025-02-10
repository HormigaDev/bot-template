import { bot } from '../bot';
import { TextCommand } from '@/types/TextCommand';
import { ChannelType, Client, Events, Message } from 'discord.js';
import { developersIds, permissionNames, Permissions } from '@/config';
import { Reply } from '@/types/Reply';

export default function (client: Client) {
    client.on(Events.MessageCreate, async (message: Message) => {
        if (message.author.bot) return;
        if (!message.guild) return;
        if (message.channel.type === ChannelType.DM) return;
        let args = message.content
            .slice((process.env.PREFIX || '!').length)
            .trim()
            .split(/ +/g);
        let command = args.shift()?.toLocaleLowerCase() || '';
        if (!command) return;
        try {
            const cmd = bot.commands.text.find(
                (c) => c.name.toLocaleLowerCase() === command || c.alias.includes(command),
            );
            if (!cmd) return;
            if (cmd.developerOnly && !developersIds.includes(message.author.id)) return;
            if (cmd.ownerOnly && message.guild.ownerId !== message.author.id) {
                await message.reply('Solo el dueño del servidor puede usar este comando.');
                return;
            }
            if (cmd.adminOnly && !message.member?.permissions.has(Permissions.Administrator)) {
                await message.reply(
                    'Solo los usuarios con el permiso de `Administrador` pueden usar este comando.',
                );
                return;
            }
            if (cmd.requiredPermissions?.length) {
                const requiredPermissionNames = [];
                for (const permission of cmd.requiredPermissions) {
                    if (!message.member?.permissions.has(permission)) {
                        const permissionName = permissionNames[`${permission}`];
                        requiredPermissionNames.push(`\`${permissionName}\``);
                    }
                }
                if (requiredPermissionNames.length) {
                    await message.reply(
                        `Permisos insuficientes.\nFaltan los siguientes permisos: ${requiredPermissionNames.join(
                            ', ',
                        )}`,
                    );
                    return;
                }
            }
            if (cmd.anyPermissions?.length) {
                let hasPerm = false;
                for (const permission of cmd.anyPermissions) {
                    if (message.member?.permissions.has(permission)) {
                        hasPerm = true;
                        break;
                    }
                }
                if (!hasPerm) {
                    await message.reply(
                        `Necesitas tener al menos uno de los siguientes permisos: ${cmd.anyPermissions
                            .map((perm) => {
                                return `\`${permissionNames[perm + '']}\``;
                            })
                            .join(', ')}`,
                    );
                    return;
                }
            }
            await cmd.execute(bot, message, args);
        } catch (error) {
            if (error instanceof Reply) {
                await message.reply(error.message);
            } else {
                try {
                    await message.reply('Ocurrió un error inesperado al procesar el comando.');
                } catch (err) {
                    console.log(err);
                }
                console.log(error);
            }
        }
    });
}
