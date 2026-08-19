import {faker} from "@faker-js/faker";
import type {  UserUncheckedCreateInput, UserCreateInput, RoleCreateInput, QuoteCreateWithoutUserInput, RoleWhereUniqueInput } from "../prisma/models";
import type {roles} from "@/app/lib/definitions";
import bcrypt from "bcryptjs";
const { internet, helpers, lorem, date, number } = faker;

export function createRole( role: roles):RoleCreateInput
{
    return {
        name: role
    }
}

export function createMultiRole(names: roles[]): RoleCreateInput[]
{
    const roles: RoleCreateInput[] = [];
    
   names.forEach((name) => {
     roles.push(createRole(name))
   })

   return roles;
}

export function createUser(index: number): UserCreateInput
{
    let count: number = faker.number.int(20);
    const i : number = faker.number.int(index*100)
    const quotes : QuoteCreateWithoutUserInput[] = createMultiQuotes(count);
    const time = date.recent();
    const name = internet.username();
    const role = helpers.arrayElement([1,2,3,4]);
    const pass = bcrypt.hashSync('password', 10);
    return {
        name: name+i,
        email: name+i+"@gmail.com",
        password: pass,
        role: {
            connect:{ id: role}
        },
        createdAt: time,
        quotes: {
            createMany:{data: quotes}
        },
    }
}

export function createMultiUsers(count: number = 0): UserCreateInput[]
{
    let amount: number = count  > 0 ? count : faker.number.int(200);
    const users :  UserCreateInput[] = [];
        while( amount > 0) {
        users.push(createUser(amount))
        amount--;
    }
    return users;
}

export function createQuote(): QuoteCreateWithoutUserInput
{
    return {
        message: lorem.text(),
    };
}


export function createMultiQuotes(count: number )
{
        const quotes :  QuoteCreateWithoutUserInput[] = [];
        while( count > 0) {
        quotes.push(createQuote())
        count--;
    }
    return quotes;
}

