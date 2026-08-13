import {faker} from "@faker-js/faker";
import type { UserCreateInput, RoleCreateInput, QuoteCreateWithoutUserInput, PlanCreateInput } from "../prisma/models";

const { internet, helpers, lorem, date, number } = faker;

export function createUser(index: number): UserCreateInput
{
    let count: number = faker.number.int(20);
    const i : number = faker.number.int(index*100)
    const time = date.recent();
    const quotes : QuoteCreateWithoutUserInput[] = createMultiQuotes(count, time);
    const name = internet.username();
    const role = helpers.arrayElement(['USER', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN']);
    return {
        name: name+i,
        email: name+i+"@gmail.com",
        role: role,
        createdAt: time,
        quotes: {
            create:quotes
        },
    }
}

export function createMultiUsers(count: number): UserCreateInput[]
{
    const users :  UserCreateInput[] = [];
        while( count > 0) {
        users.push(createUser(count))
        count--;
    }
    return users;
}

export function createQuote(time: Date): QuoteCreateWithoutUserInput
{
    return {
        message: lorem.text(),
        createdAt: time
    };
}


export function createMultiQuotes(count: number, time: Date)
{
        const quotes :  QuoteCreateWithoutUserInput[] = [];
        while( count > 0) {
        quotes.push(createQuote(time))
        count--;
    }
    return quotes;
}

