import {faker} from "@faker-js/faker";
import type { UserCreateInput, RoleCreateInput, QuoteCreateInput, PlanCreateInput } from "../prisma/models";

const { internet, helpers, lorem, date, number } = faker;

export function createUser()
{
    let count: number = faker.number.int(20);
    const i : number = faker.number.int(index*100)
    const quotes : QuoteCreateInput[] = createMultiQuotes(count);
    const name = internet.username();
    const roleId = helpers.arrayElement([1,2,3]);
    const time = date.recent();
    return {
        name: name+i,
        email: name+i+"@gmail.com",
        roleId: roleId,
        createdAt: time,
        quotes: {
            create:quotes
        },
    }
}

export function createMultiUsers()
{

}

export function createQuote()
{

}


export function createMultiQuotes(count: number)
{

}

