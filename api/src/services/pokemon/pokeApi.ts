import fetch, { Response } from "node-fetch";
import { ServiceUnavailable, ExternalError } from "../../errors";
import { capitalize } from "../../utils";
import { IPayloadPokemon, ISerializedPokemon } from "./interfaces";

class PokeApi {
    private _response: Response;
    private _payload: IPayloadPokemon;
    private _url = "https://pokeapi.co/api/v2/pokemon/";

    private async fetch(url: string): Promise<void> {
        try {
            this._response = await fetch(url);
        } catch (err) {
            throw new ServiceUnavailable("External service pokeapi.co is unavailable.");
        }

        if (!this._response.ok) throw new ExternalError(this._response.statusText, this._response.status);
    }

    private async parse(): Promise<void> {
        this._payload = await this._response.json();
    }

    private serialize(): ISerializedPokemon {
        return {
            id: this._payload.id,
            name: capitalize(this._payload.name),
            weight: this._payload.weight
        };
    }

    async getEntity(id: number): Promise<ISerializedPokemon> {
        const url = `${this._url}${id}`;
        await this.fetch(url);
        await this.parse();
        const newPokeEntity = this.serialize();
        return newPokeEntity;
    }
}

export const pokeApi = new PokeApi();

