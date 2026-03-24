import {faker} from '@faker-js/faker';
import type { IPosts } from './definitions';
import type { UserCreateInput } from '@/generated/prisma/models';

const int = faker.internet;
const lor = faker.lorem;
const help = faker.helpers;


export function generatePost(): IPosts {
    return {
        title: lor.sentence(),
        content: lor.paragraph(),
        published: help.arrayElement([true, false]),
    }
}

export function generateMultiPosts(count :number = 1): IPosts[] {

    const posts: IPosts[] = [];
    while( count > 0) {
        posts.push(generatePost())
        count--;
    }
    return posts;
}

export function generateUser(index: number) :  UserCreateInput {
    let count: number = faker.number.int(20);
    const i : number = faker.number.int(index*100)
    const posts : IPosts[] = generateMultiPosts(count);
    const name = int.username();
    return {
        name: name+i,
        email: name+i+"@gmail.com",
        posts: {
            create:posts
        },
    }
}

export function generateMultiUsers(max: number = 0):  UserCreateInput[] {
    let amount: number = max  > 0 ? max : faker.number.int(200);
    console.log('amount')
    console.log(amount)
    const users :  UserCreateInput[] = [];
        while( amount > 0) {
        users.push(generateUser(amount))
        amount--;
    }
    return users;
}