import {faker} from '@faker-js/faker';

export async function createFund() {

    return {
        user_id: 1,
        title: faker.finance.accountName(),
        description: faker.lorem.paragraph(),
        category: faker.book.genre(),
        funded: faker.finance.amount({min: 0, max: 1000}),
        fund_goal: faker.finance.amount({min: 1000, max: 2000}),
        votes: JSON.stringify({l: faker.number.int({min: 1, max: 2}), d: faker.number.int({min: 10, max: 20})})
    }
}