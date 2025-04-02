import {faker} from '@faker-js/faker';

let count = 0;

export async function createComment() {
    
    count++
    
    return {
        user_id: count,
        fund_id: count,
        content: faker.lorem.paragraph(),
    }
}