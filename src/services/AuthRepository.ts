import Repository from "@/services/Repository";

export default {
  async login(payload: any) {
    return await Repository.post("api/auth/login", payload);
  }
}
