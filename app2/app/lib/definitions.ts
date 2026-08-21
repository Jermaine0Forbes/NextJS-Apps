export type roles = "USER" |  "MODERATOR" | "ADMIN"| "SUPER_ADMIN";

export interface SessionUser {
  id: number;
  email: string;
  name: string,
  role: Role;
}

export interface Role {
    name: roles
}