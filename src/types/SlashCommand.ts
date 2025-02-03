import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export type SlashCommand = {
    name: string;
    data: SlashCommandBuilder;
    execute: (interaction: CommandInteraction) => Promise<void>;
};
