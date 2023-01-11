import Repository from "@/services/Repository";
import {resource} from "@/interfaces/response.interface";
import {TokenService} from "@/services/token";
import {RoleInterface} from "@/interfaces/role.interface";

export default {
  async getModules(): Promise<resource> {
    return await Repository.get("api/role/module", {
      headers: TokenService.getHeader(),
    });
  },
  async storeRole(params: RoleInterface): Promise<resource> {
    return await Repository.post("api/role", params, {
      headers: TokenService.getHeader(),
    })
  }
}
