import { Events, PresenceUpdateStatus, ActivityType } from 'discord.js';
import { bot } from '../bot';

bot.on(Events.ClientReady, () => {
    console.log(`Sesión iniciada como "${bot.user!.username}"`);
    bot.user!.setActivity('BBEL Studios', {
        type: ActivityType.Watching,
    });
    bot.user!.setStatus(PresenceUpdateStatus.Online);
});
