import { request } from '../config/common';
import { faker } from '@faker-js/faker';

async function createRandomUserWithFaker() {
    const userdata = {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        gender: faker.gender,
        status: "active",
      };
      const userRes = await request.post(`users?access-token=${TOKEN}`).send(userdata);
      let userId = await userRes.body.id;
      return userId;
}

exports.createRandomUserWithFaker = createRandomUserWithFaker;



