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

export interface Quote {
  id: string,
  message: string,
  user: SessionUser,
  createdAt: string
}

export type JWTPayload = {
  payload: SessionUser
  protectedHeader:{
    alg: string, 
    typ?: string | undefined
  }
}

export type authResponse = {
    ok?:boolean
    error?: string
};

export type QuoteResponse = {
   errors?: Array<object>
   data: {
    quotes: Array<Quote>
   }
}

export type Quotes = Array<Quote>;