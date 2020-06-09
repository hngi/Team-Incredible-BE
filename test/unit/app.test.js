//require assert to confirm test cases
const assert = require('assert');
//require functions from index.js
const app = require('../../app');



//READ ME
//This test should simulate the use of API to consume data and 
//push to auth.microapi.dev sucessfully
// using the app() in index.js
//cmd> npm run test 

//Note! this test would not pass until the condition is satisfied, 
//modification may still be required. Ref (Gafar_01)

describe('POST /login', ()=>{
    //sample correct JSON data which is in database
    it('should respond 200', (done)=>{
        request(app)
            .post('/api/v1/login')
            .send({username:'team.incredible@gmail.com',password:'Incredible'})
            .expect(200)
            
    });
    //sample incorrect JSON data which is not in database
    it('should respond with 404', (done)=>{
        request(app)
            .post('/api/v1/login')
            .send({username:"incorrect@gmail.com", password:"Patch"})
            .expect(404)
    });
});
