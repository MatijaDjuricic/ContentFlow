import { Schema, model } from "mongoose";
import { IUser } from "../types/UserTypes";

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (v: string) => /\S+@\S+\.\S+/.test(v),
            message: (props: any) => `${props.value} is not a valid email!`,
        },
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
}, {
    timestamps: true
});

export const User = model<IUser>('User', UserSchema);