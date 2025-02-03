import { Bot } from '@/bot';
import { Message } from 'discord.js';

export type RawCommand = {
    name: string;
    alias: string[];
    description?: string;
    usage?: string;
    anyPermissions?: bigint[];
    requiredPermissions?: bigint[];
    adminOnly?: boolean;
    ownerOnly?: boolean;
    developerOnly?: boolean;
    execute: (bot: Bot, message: Message, args: string[]) => Promise<void>;
};
