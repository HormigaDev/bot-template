import { Client } from 'discord.js';
import readyEvent from '@/events/ready.event';
import messageEvent from '@/events/message.event';
import interactionEvent from '@/events/interaction.event';

export const EventsHandler = async (client: Client) => {
    readyEvent(client);
    messageEvent(client);
    interactionEvent(client);
};
