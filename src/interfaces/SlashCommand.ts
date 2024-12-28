import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface SlashCommand {
    name: string;
    data: SlashCommandBuilder;
    execute: (interaction: CommandInteraction) => Promise<void>;
}
