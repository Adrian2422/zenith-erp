export interface JwtModel {
  sub: string;
  userId: number;
  role: string[];
  permissions: string[];
  // role: RoleEnum;
  // permissions: PermissionsEnum[];
}
