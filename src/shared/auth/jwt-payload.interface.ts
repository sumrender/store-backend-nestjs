export interface IJwtPayload {
  email: string;
  sub: string; // user id
  iat?: Date;
  exp?: Date;
}
