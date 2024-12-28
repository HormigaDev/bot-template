import { Client, Collection } from 'discord.js';

export class Bot extends Client {
    commands = {
        raw: new Collection(),
        slash: new Collection(),
    };
    constructor({ intents }: { intents: number[] }) {
        super({ intents });
    }
}

/**
 * Estos intentos son TODOS los intentos en Discord, si necesitas otros intentos puedes buscar en google
 * un intents calculator y ver cual se adapta a tu necesidad
 */
export const bot = new Bot({ intents: [3276799] });
