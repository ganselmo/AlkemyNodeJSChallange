const { expect } = require('chai');
const request = require('supertest');



module.exports = moviesTests = async (server, token) => {
    describe('Movies API', async () => {
        let movieGenre
        before(async () => {
            const genre = {
                "imgUrl": "https://i.blogs.es/4c3a93/650_1000_cartel-interstellar/1366_2000.jpg",
                "name": "Suspenso"
            }
            const { body, status } = await request(server).post('/api/v1/genres').set({ 'x-auth-token': token }).send(genre);
            expect(status).to.equal(201);
            movieGenre = body

        });
        it('Shows all movies and they are empty', async () => {
            const { body, status } = await request(server).get('/api/v1/movies').set({ 'x-auth-token': token });
            expect(status).to.equal(200);
            expect(body.length).to.equal(0)
        });

        let movieToBeFound
        it('should post one movie', async () => {

            const movie = {
                "imgUrl": "https://i.blogs.es/4c3a93/650_1000_cartel-interstellar/1366_2000.jpg",
                "title": "Interestellar",
                "creationDate": "12/5/1990",
                "genre_uuid": movieGenre.uuid,
                "rating": "3"

            }
            const { body, status } = await request(server).post('/api/v1/movies').set({ 'x-auth-token': token }).send(movie);
            expect(status).to.equal(201);
            movieToBeFound = body
        });

        it('should not Post wrong date movie', async () => {

            const movie = {
                "imgUrl": "https://i.blogs.es/4c3a93/650_1000_cartel-interstellar/1366_2000.jpg",
                "title": "Suspenso",
                "creationDate": "13/13/1990",
                "genre_uuid": movieGenre.uuid,
                "rating": "3"

            }
            const { body, status } = await request(server).post('/api/v1/movies').set({ 'x-auth-token': token }).send(movie);
            expect(status).to.equal(400);
        });


        it('Not to post imgUrl not url movie', async () => {

            const movie = {
                "imgUrl": "photo",
                "title": "Interestellar",
                "creationDate": "12/5/1990",
                "genre_uuid": movieGenre.uuid,
                "rating": "3"
            }
            const { body, status } = await request(server).post('/api/v1/movies').set({ 'x-auth-token': token }).send(movie);
            expect(status).to.equal(400);
            expect(body.name).to.equal("SequelizeValidationError")
        });

        it('Not to post rating above 5 or below 1', async () => {

            const movie = {
                "imgUrl": "https://i.blogs.es/4c3a93/650_1000_cartel-interstellar/1366_2000.jpg",
                "title": "Interestellar 2",
                "creationDate": "13/13/1990",
                "genre_uuid": movieGenre.uuid,
                "rating": "9"
            }
            const { body, status } = await request(server).post('/api/v1/genres').set({ 'x-auth-token': token }).send(movie);
            expect(status).to.equal(400);
        });


        it('Not to Post a missing field movie', async () => {

            const movie = {

                "imgUrl": "https://i.blogs.es/4c3a93/650_1000_cartel-interstellar/1366_2000.jpg",
                "title": "Interestellar 2",
                "creationDate": "13/13/1990",
                "rating": "9"
            }
            const { body, status } = await request(server).post('/api/v1/genres').set({ 'x-auth-token': token }).send(movie);
            expect(status).to.equal(400);
            expect(body.name).to.equal("SequelizeValidationError")
        });



        let movieToCheck
        it('get all movies and they returns 1', async () => {
            const { body, status } = await request(server).get('/api/v1/movies').set({ 'x-auth-token': token });
            expect(status).to.equal(200);
            expect(body.length).to.equal(1)
            movieToCheck = body[0]
        });

        it('should get only imgUrl,title,creationDate', async () => {


            const { imgUrl, title, creationDate, genre_uuid, rating } = movieToCheck
            expect(imgUrl).to.equal("https://i.blogs.es/4c3a93/650_1000_cartel-interstellar/1366_2000.jpg");
            expect(title).to.equal("Interestellar")
            expect(creationDate).to.equal("1990-12-05T02:00:00.000Z")
            expect(genre_uuid).to.be.undefined
            expect(rating).to.be.undefined
        });

        it('should get all data from movie', async () => {

            const { body, status } = await request(server).get('/api/v1/movies/' + movieToBeFound.uuid).set({ 'x-auth-token': token });
            expect(status).to.equal(200);
            const { imgUrl, title, creationDate, genre, rating } = body
            expect(imgUrl).to.equal("https://i.blogs.es/4c3a93/650_1000_cartel-interstellar/1366_2000.jpg");
            expect(title).to.equal("Interestellar")
            expect(creationDate).to.equal("1990-12-05T02:00:00.000Z")
            expect(genre.uuid).to.equal(movieGenre.uuid)
            expect(rating).to.equal(3)
        });

            it('patch movie', async () => {
                const movie = {
                    "title": "Nombre pelicula 3"
                }
                const { body, status } = await request(server).patch('/api/v1/movies/' + movieToBeFound.uuid).set({ 'x-auth-token': token }).send(movie);
                expect(status).to.equal(204);

            });

            it('check movie changed ', async () => {
                const { body, status } = await request(server).get('/api/v1/movies/' + movieToBeFound.uuid).set({ 'x-auth-token': token });
                expect(status).to.equal(200);
                expect(body.title).to.equal("Nombre pelicula 3")
            });


            it("should delete the movie", async () => {
                const { status } = await request(server).delete('/api/v1/movies/'+movieToBeFound.uuid).set({ 'x-auth-token': token });
                expect(status).to.equal(204); 
            })
    
    });
}