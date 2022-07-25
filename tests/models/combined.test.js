
const { expect } = require('chai');
const { body } = require('express-validator');
const request = require('supertest');

module.exports = moviesTests = async (sequelize, server, token) => {
    describe('All combinations tests API', async () => {
        before('clean', async () => {
            await sequelize.sync({ force: true });

        })
        let char1, char2, char1_uuid, genre1_uuid;

        describe("Create a movie with 2 charactes assigned and validate them", async () => {

            let char2_uuid;
            before('Create 2 characters and the genre', async () => {

                char1 = {
                    "imgUrl": "https://image.shutterstock.com/z/stock-photo-young-hispanic-man-smiling-happy-listening-to-music-using-headphones-at-street-of-city-1898366359.jpg",
                    "name": "Roberto Garcia",
                    "age": "32",
                    "weight": "100",
                    "story": "I got up every day at 6 AM"

                }

                char2 = {
                    "imgUrl": "https://image.shutterstock.com/z/stock-photo-young-hispanic-man-smiling-happy-listening-to-music-using-headphones-at-street-of-city-1898366359.jpg",
                    "name": "Juan Perez",
                    "age": "50",
                    "weight": "70",
                    "story": "I got up every day at 12 AM"

                }
                const genre1 = {
                    "imgUrl": "https://i.blogs.es/4c3a93/650_1000_cartel-interstellar/1366_2000.jpg",
                    "name": "Suspenso"
                }

                const { body: char1Body } = await request(server).post('/api/v1/characters').set({ 'x-auth-token': token }).send(char1);
                const { body: char2Body } = await request(server).post('/api/v1/characters').set({ 'x-auth-token': token }).send(char2);
                const { body: genre1Body } = await request(server).post('/api/v1/genres').set({ 'x-auth-token': token }).send(genre1);

                char1_uuid = char1Body.uuid

                char2_uuid = char2Body.uuid
                genre1_uuid = genre1Body.uuid
            })

            let movieToBeFound
            it('should post a movie with 2 characters', async () => {

                const movie = {
                    "imgUrl": "https://i.blogs.es/4c3a93/650_1000_cartel-interstellar/1366_2000.jpg",
                    "title": "El Día después de mañana",
                    "creationDate": "12/5/1990",
                    "genre_uuid": genre1_uuid,
                    "rating": "3",
                    "characters": [{
                        uuid: char1_uuid
                    },
                    { uuid: char2_uuid }]

                }
                const { body, status } = await request(server).post('/api/v1/movies').set({ 'x-auth-token': token }).send(movie);
                expect(status).to.equal(201);
                movieToBeFound = body
            });

            it('should get the movie showing the 2 characters', async () => {
                const { body, status } = await request(server).get('/api/v1/movies/' + movieToBeFound.uuid).set({ 'x-auth-token': token })
                expect(status).to.equal(200);
                expect(body.characters.length).to.equal(2);
                expect(body.characters[0].name).to.equal("Roberto Garcia");
                expect(body.characters[1].age).to.equal(50);
                body
            })

        })
        let movieGenre, movie1;
        describe("Assing 2 new movies to the first character and validate them", async () => {

            let movie2;
            before(async () => {

                const genre2 = {
                    "imgUrl": "https://i.blogs.es/4c3a93/650_1000_cartel-interstellar/1366_2000.jpg",
                    "name": "Accion"
                }
                const { body: genre2Body } = await request(server).post('/api/v1/genres').set({ 'x-auth-token': token }).send(genre2);
                movieGenre = genre2Body
                movie1 = {
                    "imgUrl": "https://image.shutterstock.com/z/stock-photo-young-hispanic-man-smiling-happy-listening-to-music-using-headphones-at-street-of-city-1898366359.jpg",
                    "title": "Interestellar",
                    "creationDate": "12/6/1998",
                    "genre_uuid": movieGenre.uuid,
                    "rating": "1",
                    "characters": [{ uuid: char1_uuid }]
                }

                movie2 = {
                    "imgUrl": "https://image.shutterstock.com/z/stock-photo-young-hispanic-man-smiling-happy-listening-to-music-using-headphones-at-street-of-city-1898366359.jpg",
                    "title": "Rocky 4",
                    "creationDate": "12/4/1990",
                    "genre_uuid": movieGenre.uuid,
                    "rating": "5",
                    "characters": [{ uuid: char1_uuid }]

                }



            })
            let movie1_uuid, movie2_uuid, genre2_uuid;
            await it("should post movies with character assigned", async () => {
                const { body: movie1Body } = await request(server).post('/api/v1/movies').set({ 'x-auth-token': token }).send(movie1);
                const { body: movie2Body } = await request(server).post('/api/v1/movies').set({ 'x-auth-token': token }).send(movie2);
                movie1_uuid = movie1Body.uuid
                movie2_uuid = movie2Body.uuid
                genre2_uuid = movieGenre.uuid
            })


            it('should get the character with 2 movies.', async () => {


                const { body, status } = await request(server).get('/api/v1/characters/' + char1_uuid).set({ 'x-auth-token': token });
                expect(status).to.equal(200);
                expect(body.movies.length).to.equal(3)


            });


        })

        describe("get movies by Genre", async () => {
            it('should get the 2 movies for the genre', async () => {
                const { body, status } = await request(server).get('/api/v1/genres/' + movieGenre.uuid + "/movies").set({ 'x-auth-token': token });
                expect(status).to.equal(200);
                expect(body.length).to.equal(2)
            })
        })

        describe("search a movie with specific name", async () => {
            it("should get the specific movie regarding its title", async () => {
                const { body, status } = await request(server).get('/api/v1/movies?title=El Día después de mañana').set({ 'x-auth-token': token });
                expect(status).to.equal(200);
                expect(body[0].title).to.equal("El Día después de mañana")
                expect(body[0].creationDate).to.equal("1990-12-05T02:00:00.000Z")
            })
        })


        describe("search characters with specific age", async () => {

            it("should get the specific character with age 30", async () => {
                const { body, status } = await request(server).get('/api/v1/characters?age=32').set({ 'x-auth-token': token });
                expect(status).to.equal(200);
                expect(body[0].name).to.equal("Roberto Garcia")
            })

        })

        describe("order movies by creationDate", async () => {
            it("should get the movies in specific ASC order", async () => { 
                const { body, status } = await request(server).get('/api/v1/movies?order=ASC').set({ 'x-auth-token': token });

                expect(body[0].title).to.equal("Rocky 4")
                expect(body[1].title).to.equal("El Día después de mañana")
                expect(body[2].title).to.equal("Interestellar")
            })

            it("should get the movies in specific DESC order", async () => { 
                const { body, status } = await request(server).get('/api/v1/movies?order=DESC').set({ 'x-auth-token': token });

                
                expect(body[0].title).to.equal("Interestellar")
                expect(body[1].title).to.equal("El Día después de mañana")
                expect(body[2].title).to.equal("Rocky 4")
                
            })
        })
    })
}