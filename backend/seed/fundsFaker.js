import {faker} from '@faker-js/faker';

export async function createFund() {

    return {
        user_id: 1,
        title: faker.finance.accountName(),
        description: faker.lorem.paragraph(),
        category: faker.book.genre(),
        funded: faker.finance.amount(),
        fund_goal: (parseFloat(faker.finance.amount()) + parseFloat(faker.finance.amount())),
        votes: JSON.stringify({l: faker.number.int(), d: faker.number.int()})
    }
}