import {faker} from "@faker-js/faker";
import type {  UserUncheckedCreateInput, RoleCreateInput, QuoteCreateWithoutUserInput, PlanCreateInput } from "../prisma/models";
import type {roles} from "@/app/lib/definitions";
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

export function createUser(index: number): UserUncheckedCreateInput
{
    let count: number = faker.number.int(20);
    const i : number = faker.number.int(index*100)
    const time = date.recent();
    const quotes : QuoteCreateWithoutUserInput[] = createMultiQuotes(count);
    const name = internet.username();
    const role = helpers.arrayElement([1,2,3,4]);
    return {
        name: name+i,
        email: name+i+"@gmail.com",
        roleId: role,
        createdAt: time,
        quotes: {
            create:quotes
        },
    }
}

export function createMultiUsers(count: number): UserUncheckedCreateInput[]
{
    let amount: number = count  > 0 ? count : faker.number.int(200);
    const users :  UserUncheckedCreateInput[] = [];
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

