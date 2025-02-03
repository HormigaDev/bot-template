import { readdirSync } from 'fs';
import { join } from 'path';

export const EventsHandler = async () => {
    const files = readdirSync(join(__dirname, '../events')).filter((f) => f.endsWith('.ts'));
    console.log('Cargando eventos...');
    for (const file of files) {
        await import(join(__dirname, '../events/', file));
    }
    console.log('Eventos cargados con éxito!');
};
