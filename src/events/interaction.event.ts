import { CacheType, ChannelType, Client, Events, Interaction, InteractionType } from 'discord.js';
import { bot } from '../bot';
import { SlashCommand } from '@/types/SlashCommand';

export default function (client: Client) {
    client.on(Events.InteractionCreate, async (interaction: Interaction<CacheType>) => {
        if (interaction.channel?.type === ChannelType.DM) return;
        if (interaction.type === InteractionType.ApplicationCommand) {
            try {
                const cmd = bot.commands.slash.find((c) => c.name === interaction.commandName);
                if (!cmd) return;
                await cmd.execute(interaction);
            } catch (err) {
                console.log(
                    "Ocurrió un error al procesar el comando '{}'".replace(
                        '{}',
                        interaction.commandName,
                    ),
                    err,
                );
            }
        }
    });
}
