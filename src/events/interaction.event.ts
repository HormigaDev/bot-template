import colors from 'chalk';
import { CacheType, ChannelType, Events, Interaction, InteractionType } from 'discord.js';
import { bot } from '../bot';
import { SlashCommand } from '@/interfaces/SlashCommand';

bot.on(Events.InteractionCreate, async (interaction: Interaction<CacheType>) => {
    if (interaction.channel?.type === ChannelType.DM) return;
    if (interaction.type === InteractionType.ApplicationCommand) {
        try {
            const cmd = bot.commands.slash.find((c: unknown) => {
                const cmd = c as SlashCommand;
                return cmd.name === interaction.commandName;
            }) as SlashCommand;
            if (!cmd) return;
            await cmd.execute(interaction);
        } catch (err) {
            console.log(
                colors.red(
                    "Ocurrió un error al procesar el comando '{}'".replace(
                        '{}',
                        interaction.commandName,
                    ),
                ),
                err,
            );
        }
    }
});
