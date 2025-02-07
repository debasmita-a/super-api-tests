import { expect } from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";

const request = supertest("https://gorest.co.in/public/v2/");
const TOKEN =
  "8b46e22bd11113ea8338bc712bd3f390d49d5711d91e5cd483dfcdecb99b097d";

describe.only('User Posts', ()=>{
    let postId = null;

    it('/posts', async()=>{
        const data = {
            "user_id" : 7682092,
            "title" : "this is a test",
            "body" : "this is a test post body"
        }
        const response = await request.post("posts")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data);

         
        expect(response.body).to.deep.include(data);
        postId = response.body.id;
        console.log(postId);
    });

    it('GET /posts/:id', async()=>{
        const response = await request.get(`posts/${postId}`)
        .set("Authorization", `Bearer ${TOKEN}`);
        expect(response.body.title).to.eq("this is a test");
    })
});