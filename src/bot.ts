import { Client, Collection } from 'discord.js';
import { TextCommand } from './types/TextCommand';
import { SlashCommand } from './types/SlashCommand';

export class Bot {
    commands = {
        text: new Collection<string, TextCommand>(),
        slash: new Collection<string, SlashCommand>(),
    };
    client: Client;
    constructor() {
        this.client = new Client({ intents: [3276799] });
    }
}

/**
 * Estos intentos son TODOS los intentos en Discord, si necesitas otros intentos puedes buscar en google
 * un intents calculator y ver cual se adapta a tu necesidad
 */
export const bot = new Bot();
