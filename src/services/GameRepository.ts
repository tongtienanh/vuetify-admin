import Repository from "@/services/Repository";
import {deleteParam, gameParams, payloadGame, payloadImage} from "@/interfaces/game.interface";
import {TokenService} from "@/services/token";
import {resource} from "@/interfaces/response.interface";

export default {
  async create(payload: payloadGame) {
    return await Repository.post("api/game", payload);
  },
  async uploadImage(payload: FormData) {
    return await Repository.post("api/game/upload/image", payload);
  },
  async getListGame(params: gameParams): Promise<resource> {
    return await Repository.get("api/game/all", {
      params,
      headers: TokenService.getHeader(),
    })
  },
  async deleteGame(params: deleteParam): Promise<resource> {
    return await Repository.delete("api/game/delete", {
      params,
      headers: TokenService.getHeader(),
    })
  }
}
