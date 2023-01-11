export interface UserInterface {
  id?: number,
  username: string,
  password: string,
  fullname: string,
  age?: number,
  gender?: number,
  roleIds:number[],
}
