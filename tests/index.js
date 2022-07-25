
require('dotenv').config({ path: __dirname + '/.env.test' })
const { expect } = require('chai');
const request = require('supertest');
const server = require('../src/app');
const { sequelize } = require('../src/models');

const genreTests = require('./models/genre.test');
const authTests = require('./models/auth.test');

const charactersTests = require('./models/characters.test');
const moviesTests = require('./models/movies.test');
const combinedTests = require ('./models/combined.test')

const excuteTest = async () => {

    describe("Api testing", () => {
        const user = {
            "firstName": "Test",
            "lastName": "User",
            "email": "user@test.com",
            "password": "userTest123!"
        }
    
        let token
        before(async () => {
            await sequelize.sync({ force: true });
            
        })
        
        before(async () => {
            const response = await request(server).post('/api/v1/auth/register').send(user);
            token = response.body.token
    
    
        });


        
        it("should get new Token", async () => {
            expect(token).to.be.not.empty
        })
        it("should execute Auth Api with the token", async () => {
            await authTests(server)
        })

        it("should execute Genre Api with the token", async () => {
            await genreTests(server, token)
        })
        
        it("should execute Characters Api with the token", async () => {
            await charactersTests(server, token)
        })
        
        it("should execute Movies Api with the token", async () => {
            await moviesTests(server, token)
        })
        it("should execute all Api combined in several scenarios", async () => {
            await combinedTests(sequelize,server, token)
        })



        


    })




}

excuteTest()