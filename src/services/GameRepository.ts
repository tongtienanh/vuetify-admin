import Repository from "@/services/Repository";
import {gameParams, payloadGame, payloadImage} from "@/interfaces/game.interface";

export default {
  async create(payload: payloadGame) {
    return await Repository.post("api/game", payload);
  },
  async uploadImage(payload: FormData) {
    return await Repository.post("api/game/upload/image", payload);
  },
  async getListGame(params: gameParams) {
    return await Repository.get("api/game/all", {
      params
    })
  }
}
