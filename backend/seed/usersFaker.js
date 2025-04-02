import {faker} from '@faker-js/faker';
import bcrypt from 'bcrypt';


export async function createUser() {

    const password = '123';
    const hashPassword = await bcrypt.hash(password, 10);

    return {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        user_description: faker.lorem.paragraph(),
        password: hashPassword,
        role: faker.helpers.arrayElement(['guest', 'user', 'admin']),
        avatar: faker.image.avatar()
    }
}