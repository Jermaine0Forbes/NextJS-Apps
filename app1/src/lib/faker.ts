import {faker} from '@faker-js/faker';
import type { fUser, IPosts } from './definitions';

const int = faker.internet;
const lor = faker.lorem;
const help = faker.helpers;


function generatePost(): IPosts {
    return {
        title: lor.sentence(),
        content: lor.paragraph(),
        published: help.arrayElement([true, false]),
    }
}

function generateUser() : fUser{

    const name = int.username();
    return {
        name: name,
        email: name+"@gmail.com",
        posts: {
            create:[]
        },
    }
}