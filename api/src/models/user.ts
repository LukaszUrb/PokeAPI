
import { compare, hash } from "bcryptjs";
import { Schema, model, Document } from "mongoose";
import { BCRYPT_WORK_FACTOR, POK_MAX_ID, POK_MIN_ID } from "../config";
import { randomFromRange } from "../utils";

export interface ITSUser {
    email: string;
    password: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    pokeId?: number;
    matchesPassword: (password: string) => Promise<boolean>;
}


const userSchema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        pokeId: { type: Number, default: 1 }
    },
    { timestamps: true }
);


userSchema.pre<UserDocument>("save", async function () {
    if (this.isModified("password")) this.password = await hash(this.password, BCRYPT_WORK_FACTOR);
    if (this.isNew) this.pokeId = randomFromRange(POK_MIN_ID, POK_MAX_ID);
});


userSchema.methods.matchesPassword = function (password: string): Promise<boolean> {
    return compare(password, this.password);
};


userSchema.set("toJSON", {
    transform: (doc, { __v, password, ...rest }, options) => rest
});


export interface UserDocument extends ITSUser, Document { }
export const User = model<UserDocument>("User", userSchema); 
