import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    cooldowns: Record<string, any>;
}

const UserSchema = new Schema<IUser>(
    {
        cooldowns: { type: Object, default: {} },
    },
    { versionKey: false },
);

export const User = mongoose.model<IUser>('User', UserSchema);
