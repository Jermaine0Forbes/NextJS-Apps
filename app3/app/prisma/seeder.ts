import {faker} from "@faker-js/faker";

const int = faker.internet;
const lor = faker.lorem;
const help = faker.helpers;

export function createCritic(index: number = 1)
{
        let count: number = faker.number.int(20);
    const i : number = faker.number.int(index*100)
    // const posts : IPosts[] = generateMultiPosts(count);
    const name = int.username();
    return {
        username: name+i,
        name: name+i,
        email: name+i+"@gmail.com",
        // posts: {
        //     create:posts
        // },
    }
}