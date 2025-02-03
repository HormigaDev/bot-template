import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
    if (!MONGO_URI) {
        console.error(
            '🔴 Error: la URI de MongoDB no ha sido configurada en las variables de entorno',
        );
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI);
    } catch (error) {
        console.error(
            `Ocurrió un error al intentar conectarse a la base de datos MongoDB: ${error}`,
        );
        process.exit(1);
    }
};
