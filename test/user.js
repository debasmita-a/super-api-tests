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
        .then((res) =>{
            expect(res.body).to.not.include(87878);
        });
    });

    it('GET/users/:1', ()=>{
        return request.get(`users/1?access-token=${TOKEN}`)
        .then((res) =>{
            expect(res.body.id).to.be.eq(1);
        });
    });
});