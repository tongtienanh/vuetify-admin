import Repository from "@/services/Repository";
import {resource} from "@/interfaces/response.interface";
import {TokenService} from "@/services/token";

export default {
  async getModules(): Promise<resource> {
    return await Repository.get("api/module", {
      headers: TokenService.getHeader(),
    });
  },
  async getPermission(id: number): Promise<resource> {
    return await Repository.get(`api/module/permission/${id}`, {
      headers: TokenService.getHeader(),
    });
  }
}
