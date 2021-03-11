import { RequestHandler } from "express";
import { pokeApi } from "../services";
import { numberIdValidSchema, validate } from "../validation";

export const pokemonController: RequestHandler = async (req, res, next) => {
    const poke = await pokeApi.getEntity(req.session.pokeId);

    return res.json(poke);
};

export const idPokemonController: RequestHandler = async (req, res, next) => {
    await validate(numberIdValidSchema, req.params);

    const id = +req.params.id;

    const poke = await pokeApi.getEntity(id);

    return res.json(poke);
};