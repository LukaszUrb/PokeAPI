import { Request } from "express";

declare global {
    namespace Express {
        interface Session {
            createdAt: number;
            userId: string;
            pokeId: number;
        }
    }
}
