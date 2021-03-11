import { Router } from "express";
import { idPokemonController, pokemonController } from "../controllers";
import { auth, catchAsync } from "../middleware";

const router = Router();

router.get("/me", auth, catchAsync(pokemonController));
router.get("/:id", auth, catchAsync(idPokemonController));

export { router as pokemonRoute };