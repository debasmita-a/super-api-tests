import { expect } from "chai";
import { describe, it } from "mocha";
import { before } from "node:test";
import supertest from "supertest";

const request = supertest("https://gorest.co.in/public/v2/");
const TOKEN =
  "8b46e22bd11113ea8338bc712bd3f390d49d5711d91e5cd483dfcdecb99b097d";

describe.only("User Posts", () => {
  let postId = null;
  let userId = null;

  before('create user', () => {
    //create a user and then store the user id from response

  });

  it("/posts", async () => {
    //use the user id from previous step as input to the test
    const postdata = {
      user_id: userId,
      title: "this is a test",
      body: "this is a test post body",
    };

    const postRes = await request
      .post("posts")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(postdata);
      postId = await postRes.body.id;
    expect(await postRes.body.user_id).to.eq(userId);
    console.log(postId);
  });

  it("GET /posts/:id", async () => {
    const response = await request
      .get(`posts/${postId}`)
      .set("Authorization", `Bearer ${TOKEN}`);
    expect(await response.body.title).to.eq("this is a test");
  });
});
