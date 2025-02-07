import { Events, PresenceUpdateStatus, ActivityType, Client } from 'discord.js';

export default function (client: Client) {
    client.on(Events.ClientReady, () => {
        console.log(`Sesión iniciada como "${client.user!.username}"`);
        client.user!.setActivity('BBEL Studios', {
            type: ActivityType.Watching,
        });
        client.user!.setStatus(PresenceUpdateStatus.Online);
    });
}
