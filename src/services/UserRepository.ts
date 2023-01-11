import Repository from "@/services/Repository";
import {resource} from "@/interfaces/response.interface";
import {TokenService} from "@/services/token";
import {UserInterface} from "@/interfaces/user.interface";

export default {
  async listUser(params: {search: string}): Promise<resource> {
    return await Repository.get("api/users", {
      params,
      headers: TokenService.getHeader(),
    });
  },
  async remove(id: number): Promise<resource> {
    return await Repository.delete(`api/users/${id}`, {
      headers: TokenService.getHeader(),
    })
  },
  async create(request: UserInterface): Promise<resource> {
    return await Repository.post("api/users/register", request, {
      headers: TokenService.getHeader(),
    })
  }
}
