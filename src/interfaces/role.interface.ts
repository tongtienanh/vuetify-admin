export interface RoleInterface {
  id?: number,
  name: string,
  description?: string,
  permissionsId: number[],
}
