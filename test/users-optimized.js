import { expect } from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";

const request = supertest("https://gorest.co.in/public/v2/");
const TOKEN =
  "8b46e22bd11113ea8338bc712bd3f390d49d5711d91e5cd483dfcdecb99b097d";

describe("Users", () => {
  let userId;

  describe("POST", () => {
    it("/users", (done) => {
      const data = {
        // User faker.js library to generate test data.
        email: `test-${Math.floor(Math.random() * 9999)}@gmail.com`,
        name: "Test2 Name2",
        gender: "male",
        status: "inactive",
      };
      const url = `users?access-token=${TOKEN}`;
      request
        .post(url)
        .send(data)
        .end((err, response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.deep.include(data);
          userId = response.body.id;
          console.log(userId);
        });
      done();
    });

    describe("GET", () => {
      it("get all users", (done) => {
        request.get(`users?access-token=${TOKEN}`).end((err, response) => {
          expect(response.body).to.not.include(87878);
        });
        done();
      });

      it("get a user with id", (done) => {
        request
          .get(`users/${userId}?access-token=${TOKEN}`)
          .end((err, response) => {
            expect(response.body.id).to.be.eq(userId);
            console.log("GET User ID Test " + response.body.id);
          });
        done();
      });
    });

    it("/users with query params", (done) => {
      const url = `users?access-token=${TOKEN}&page=5&gender=female&status=active`;
      request.get(url).end((err, response) => {
        expect(response.body).to.not.empty;
        response.body.forEach((element) => {
          expect(element.gender).to.eq("female");
          expect(element.status).to.eq("active");
        });
        done();
      });
    });

    describe("PUT", () => {
      it("updating partial user data", (done) => {
        const data = {
          name: "Taffy1",
          status: "active",
        };
        const url = `users/${userId}`;
        request
          .put(url)
          .set("Authorization", `Bearer ${TOKEN}`)
          .send(data)
          .end((err, response) => {
            console.log(response.body);
            expect(response.body).to.deep.include(data);
          });
        done();
      });
    });

    describe("DELETE", () => {
      it("deleteing a user", (done) => {
        request
          .delete(`users/${userId}?access-token=${TOKEN}`)
          .end((err, response) => {
            expect(response.statusCode).to.eq(204);
            expect(response.body).to.be.eq(null); // ? empty
          });
        done();
      });
    });
  });
});
