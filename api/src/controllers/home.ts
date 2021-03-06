import { RequestHandler } from "express";
import { User } from "../models";

export const homeController: RequestHandler = async (req, res) => {
    const user = await User.findById(req.session.userId);
    return res.send(`Hello ${user ? user.name + " (" + req.session.pokeId + ")" : "visitor, please check the request config at <a href=https://github.com/LukaszUrb/PokeAPI>GitHub</a>."}`);
};