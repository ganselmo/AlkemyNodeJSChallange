const { expect } = require('chai');
const request = require('supertest');


module.exports = charactersTests = async (server, token) => {
    describe('Characters API', async () => {

        it("should execute Get but with no results", async () => {
            const { body, status } = await request(server).get('/api/v1/characters').set({ 'x-auth-token': token });
            expect(status).to.equal(200);
            expect(body.length).to.equal(0)
        })
        let uuidCharacter;
        it("should post new Character", async () => {
            const char = {
                "imgUrl": "https://image.shutterstock.com/z/stock-photo-young-hispanic-man-smiling-happy-listening-to-music-using-headphones-at-street-of-city-1898366359.jpg",
                "name": "Geronimo Gonzalez",
                "age": "32",
                "weight": "100",
                "story": "I got up every day at 6 AM"
                
            }
            const { body, status } = await request(server).post('/api/v1/characters').set({ 'x-auth-token': token }).send(char);
            expect(status).to.equal(201);
            uuidCharacter = body.uuid
        })

        let character;
  
        it("should get the  Get but with the new character", async () => {
            const { body, status } = await request(server).get('/api/v1/characters').set({ 'x-auth-token': token });
            expect(status).to.equal(200);
            expect(body.length).to.equal(1)
            character = body[0]
        })

        it("should contain only imgUrl and name fields", async () => {
            expect(character.imgUrl).to.equal("https://image.shutterstock.com/z/stock-photo-young-hispanic-man-smiling-happy-listening-to-music-using-headphones-at-street-of-city-1898366359.jpg");
            expect(character.name).to.equal("Geronimo Gonzalez")
            expect(character.age).to.be.undefined
            expect(character.weight).to.be.undefined
            expect(character.story).to.be.undefined
        })

        it("should get the new Character but contain all fields", async () => {
            const { body, status } = await request(server).get('/api/v1/characters/'+uuidCharacter).set({ 'x-auth-token': token });
            expect(status).to.equal(200); 
            const {imgUrl,name,age,weight,story} = body
            expect(imgUrl).to.equal("https://image.shutterstock.com/z/stock-photo-young-hispanic-man-smiling-happy-listening-to-music-using-headphones-at-street-of-city-1898366359.jpg");
            expect(name).to.equal("Geronimo Gonzalez")

            expect(age).to.equal(32)
            expect(weight).to.equal("100")
            expect(story).to.equal("I got up every day at 6 AM")
        })

        it("should patch the new Character", async () => {

            const dataToChange = {
                age:34,
                weight: 90
            }
            const { body, status } = await request(server).patch('/api/v1/characters/'+uuidCharacter).set({ 'x-auth-token': token }).send(dataToChange);
            expect(status).to.equal(204); 

        })


        it("should get that Character and validate the change", async () => {

            const { body, status } = await request(server).get('/api/v1/characters/'+uuidCharacter).set({ 'x-auth-token': token });
            expect(status).to.equal(200); 
            const {imgUrl,name,age,weight,story} = body

            expect(imgUrl).to.equal("https://image.shutterstock.com/z/stock-photo-young-hispanic-man-smiling-happy-listening-to-music-using-headphones-at-street-of-city-1898366359.jpg");
            expect(name).to.equal("Geronimo Gonzalez")
            expect(age).to.equal(34)
            expect(weight).to.equal("90")
            expect(story).to.equal("I got up every day at 6 AM")
        })

        it("should delete  the character", async () => {
            const { body, status } = await request(server).delete('/api/v1/characters/'+uuidCharacter).set({ 'x-auth-token': token });
            expect(status).to.equal(204); 
        })


    });
}