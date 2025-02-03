import mongoose, { Schema, Document } from 'mongoose';

interface IGuild extends Document {
    prefix: string;
}

const GuildSchema = new Schema<IGuild>(
    {
        prefix: { type: String, default: '!' },
    },
    { versionKey: false },
);

export const Guild = mongoose.model<IGuild>('Guild', GuildSchema);
