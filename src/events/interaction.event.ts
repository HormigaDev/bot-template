import {
    CacheType,
    ChannelType,
    Client,
    Events,
    Interaction,
    InteractionType,
    MessageFlags,
} from 'discord.js';
import { bot } from '../bot';
import { Reply } from '@/types/Reply';

export default function (client: Client) {
    client.on(Events.InteractionCreate, async (interaction: Interaction<CacheType>) => {
        if (interaction.channel?.type === ChannelType.DM) return;
        if (interaction.type === InteractionType.ApplicationCommand) {
            try {
                const cmd = bot.commands.slash.find((c) => c.name === interaction.commandName);
                if (!cmd) return;
                await cmd.execute(interaction);
            } catch (error) {
                if (error instanceof Reply) {
                    await interaction.reply({
                        content: error.message,
                        flags: MessageFlags.Ephemeral,
                    });
                } else {
                    try {
                        await interaction.reply({
                            content: 'Ocurrió un error inesperado al procesar el comando',
                            flags: MessageFlags.Ephemeral,
                        });
                    } catch (err) {
                        console.log(err);
                    }
                    console.log(error);
                }
            }
        }
    });
}
