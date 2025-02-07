import { expect } from 'chai';
import { describe, it } from 'mocha';
import supertest from 'supertest';

const request = supertest("https://gorest.co.in/public/v2/");
const TOKEN = "8b46e22bd11113ea8338bc712bd3f390d49d5711d91e5cd483dfcdecb99b097d";

describe('Users', () =>{
    it('GET/users', ()=>{
        // request
        // .get(`users?access-token=${TOKEN}`)
        // .end((err,res) =>{
        //     expect(res.body).to.not.include(87878);
        //     done();
        // });
        return request
        .get(`users?access-token=${TOKEN}`)
        .then((response) =>{
            expect(response.body).to.not.include(87878);
        });
    });

    it('GET/users/:id', async ()=>{
        let jsonArray;
        const response = await request.get(`users?access-token=${TOKEN}`);
        jsonArray = response.body;
        jsonArray.forEach(element => {
            console.log(element.id);
        });
        
    });

    it('GET/users with query params', (done) =>{
        const url = `users?access-token=${TOKEN}&page=5&gender=female&status=active`;
        request.get(url).end((err, response) =>{
            expect(response.body).to.not.empty;
            response.body.forEach(element => {
                expect(element.gender).to.eq('female');
                expect(element.status).to.eq('active');
                
            });
            done();
        });

    });

    it('POST/users', (done) =>{
        const data = {   // User faker.js library to generate test data.
            "email" : `test-${Math.floor(Math.random()*9999)}@gmail.com`,
             "name" : "Test2 Name2",
             "gender" : "male",
             "status" : "inactive"
        };
        const url = `users?access-token=${TOKEN}`;
        request.post(url).send(data).end((err,response)=>{
             expect(response.status).to.eq(201);
             expect(response.body).to.deep.include(data);
        });
        done();
    });

    it('PUT /users', (done) =>{
        const data = {
            "name" : "Taffy1",
            "status" : "active"
        };
        const url = `users/7684511`;
        request.put(url).set('Authorization', `Bearer ${TOKEN}`).send(data).end((err,response)=>{
            console.log(response.body);
            expect(response.body).to.deep.include(data);
        });
        done();
    });

    it.only('DELETE /users', (done)=>{
        request.delete(`users/7684597?access-token=${TOKEN}`).end((err, response)=>{
        expect(response.statusCode).to.eq(204);
        expect(response.body).to.be.eq(null); // ? empty
       });
       done();
    });
    
});