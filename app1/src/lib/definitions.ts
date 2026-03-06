export interface IRegisterErrors {
    username? : Array<string>,
    password? : Array<string>,
    email? : Array<string>
}


export interface IUsers {
    id?: number,
    email?: string,
    name?: string | null,
}