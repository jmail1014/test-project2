// const assert = require('assert');
const expect = require('chai').expect;
const chai = require('chai');
const server = require('../server');
const chaihttp = require('chai-http');



var should = require('chai').should();

chai.use(chaihttp);

// testing the Managers GET, /login, /logout routes
describe('Managers API', ()=>{
    
        it('It Should GET all Managers', (done) =>{
            chai.request(server)
            .get('/api/managers')
            .end((err,res) =>{
                res.should.have.status(200);    
            done();
            })
         })

        it('testing logout POST', (done) =>{
             
            chai.request(server)
            .get('/logout')
            .end((err,res) =>{ 
                res.should.have.status(404);  
                res.body.should.have.a('object');  
              done();
            })
        })
        it('It Should POST Managers email&password',(done)=>{
            const login={
                email: "jp@gmail.com",
                password: "password123"
            }
            chai.request(server)
            .post('/login')
            .send(login)
            .end((err,res)=>{
                res.should.have.status(404);
                res.body.should.be.a('object');
                //res.body.should.have.property('email');
                done(); 
            })
        
            
        })
})

             // res.should.have.status(500);  
             // res.body.should.have.a('object');  
              // res.body.should.have.property(''); 
                // res.body.should.have.property('email');
                // res.body.should.have.property('password');
              