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



export type Quotes = Array<Quote>;

export type quotes = {
  quotes: Quotes
}

export type userQuotes =  {
  userQuotes: Quotes
}

export type me = {
  me: SessionUser
}

export type createQuote = {
  createQuote : Quote
}

export type deleteQuote = {
  deleteQuote : boolean
}

export type graphQueries  = quotes | userQuotes | me | createQuote | deleteQuote;

export type graphResponse<T> = {
   errors?: Array<object>
   data: T
}

