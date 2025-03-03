import { Bot } from '@/bot';
import { Message } from 'discord.js';
import { CommandCategories } from './CommandCategories';

export type TextCommand = {
    name: string;
    alias: string[];
    description?: string;
    usage?: string;
    anyPermissions?: bigint[];
    requiredPermissions?: bigint[];
    adminOnly?: boolean;
    ownerOnly?: boolean;
    developerOnly?: boolean;
    category?: CommandCategories;
    execute: (bot: Bot, message: Message, args: string[]) => Promise<void>;
};
