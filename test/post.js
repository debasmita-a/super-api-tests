import 'dotenv/config.js'
import { request } from "../config/common";
import { expect } from "chai";
import { faker } from "@faker-js/faker";
import { createRandomUserWithFaker } from "../helper/user_helper.js";
 
const TOKEN = process.env.USER_TOKEN;


describe.only("User Posts", () => {
  let postId = null;
  let userId = null;

  //FIXME : Debug issue with before all hook.
  before(async () => {
    userId = await createRandomUserWithFaker();
    console.log(userId); 
  });


  it("/posts", async () => {
    //use the user id from previous step as input to the test
    const postdata = {
        user_id: userId,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
      };
    const postRes = await request.post("posts").set("Authorization", `Bearer ${TOKEN}`).send(postdata);
    postId = await postRes.body.id;
    expect(await postRes.body.user_id).to.eq(userId);
    console.log(postId);
  });

  it("GET /posts/:id", async () => {
    const postdata = {
        user_id: userId,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
      };
    const response = await request.get(`posts/${postId}`).set("Authorization", `Bearer ${TOKEN}`);
      console.log(response.body);
    expect(await response.body.title).to.eq(postdata.title);
  });

  describe("Negative tests", () => {
    it("401 Authentication Failure", async () => {
        const postdata = {
            user_id: userId,
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
          };
      const postRes = await request
        .post("posts").send(postdata);
        //.set("Authorization", `Bearer ${TOKEN}`)  
      expect(postRes.status).to.eq(401);
      expect(postRes.body.message).to.be.eq("Authentication failed");
      console.log(postRes.body);
    });

    it("422 Validation failed", async () => {
        const postdata = {
            user_id: userId,
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
          };
      const postRes = await request.post("posts").set("Authorization", `Bearer ${TOKEN}`);
      //.send(postdata);
      expect(postRes.status).to.eq(422);
      let array = postRes.body;
      expect(array[1].field).to.eq("user_id");
      expect(array[1].message).to.eq("is not a number");
      console.log(postRes.body);
    });
  });
});
