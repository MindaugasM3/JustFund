import {faker} from '@faker-js/faker';
import bcrypt from 'bcrypt';

let count = 0;

export async function createImage() {
   
    count++
    
    return {
        fund_id: count,
        url: faker.image.urlPicsumPhotos(),
        main: 1
    }
}