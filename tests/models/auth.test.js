const { expect } = require('chai');
const request = require('supertest');

module.exports = authTests = async (server) => {
    describe('Auth API', async () => {

        it("should register a user", async () => {
            const userToRegister = {
                "firstName": "test",
                "lastName": "auth",
                "email": "test1@authTest.com",
                "password": "AuthTest123!"
            }
            const {status,body} = await request(server).post('/api/v1/auth/register').send(userToRegister);
            expect(status).to.equal(200);
        })

        it("should not register a missing field user", async () => {
            const userToRegister ={
                "firstName":"test",
                "email":"test2@authTest.com",
                "password":"AuthTest123!"
            }
            const {status,body} = await request(server).post('/api/v1/auth/register').send(userToRegister);
            expect(status).to.equal(400);
            expect(body.token).is.not.null;
        })
        it("should not register a wrong email user", async () => {
            const userToRegister ={
                "firstName":"test",
                "lastName":"auth",
                "email":"test3com",
                "password":"AuthTest123!"
            }
            const {status,body} = await request(server).post('/api/v1/auth/register').send(userToRegister);
            expect(status).to.equal(400);
        })
        it("should not register an already registered email user", async () => {
            const userToRegister ={
                "firstName":"test",
                "lastName":"auth",
                "email":"test1@authTest.com",
                "password":"AuthTest1232!"
            }
            const {status,body} = await request(server).post('/api/v1/auth/register').send(userToRegister);
            expect(status).to.equal(400);
        })

        it("should not register a user with a too short password", async () => {
            const userToRegister ={
                "firstName":"test",
                "lastName":"auth",
                "email":"test5@authTest.com",
                "password":"Au123!"
            }
            const {status,body} = await request(server).post('/api/v1/auth/register').send(userToRegister);
            expect(status).to.equal(400);
        })

        it("should not register a user with a weak password", async () => {
            const userToRegister ={
                "firstName":"test",
                "lastName":"auth",
                "email":"test6@authTest.com",
                "password":"authTest12"
            }
            const {status,body} = await request(server).post('/api/v1/auth/register').send(userToRegister);
            expect(status).to.equal(400);
        })

        it("should not register a user with a too long password", async () => {
            const userToRegister ={
                "firstName":"test",
                "lastName":"auth",
                "email":"test7@authTest.com",
                "password":"AuthTest121231231231231231231231231231!"
            }
            const {status,body} = await request(server).post('/api/v1/auth/register').send(userToRegister);
            expect(status).to.equal(400);
        })

        it("shoud login a user", async ()  => {

            const userToLogin = {
                "email": "test1@authTest.com",
                "password": "AuthTest123!"
            }
            const {status,body} = await request(server).post('/api/v1/auth/login').send(userToLogin);
            expect(status).to.equal(200);
        })

        it("shoud not login a non existing user", async () => {
            const userToLogin = {
                "email": "test8@authTest.com",
                "password": "AuthTest123!"
            }
            const {status,body} = await request(server).post('/api/v1/auth/register').send(userToLogin);
            expect(status).to.equal(400);
        })

        it("shoud not login a missing field user", async () => {
            const userToLogin = {
                "email": "test1@authTest.com",
               
            }
            const {status,body} = await request(server).post('/api/v1/auth/register').send(userToLogin);
            expect(status).to.equal(400);
        })
        it("shoud not login a not email user", async () => {
            const userToLogin = {
                "email": "testcom",
                "password": "AuthTest123!"
            }
            const {status,body} = await request(server).post('/api/v1/auth/register').send(userToLogin);
            expect(status).to.equal(400);
        })

    });
}