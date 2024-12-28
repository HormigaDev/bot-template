import { Bot } from '@/bot';
import { Message } from 'discord.js';

export interface RawCommand {
    name: string;
    alias: string[];
    execute: (bot: Bot, message: Message, args: string[]) => Promise<void>;
}
