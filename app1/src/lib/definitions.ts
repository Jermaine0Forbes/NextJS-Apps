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


export interface IPosts {
    title: string,
    content: string,
    published?: boolean
}

export interface createPosts {

    create : IPosts[]
}

export interface fUser extends IUsers {
    posts?: createPosts
}



