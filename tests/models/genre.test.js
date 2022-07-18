const  { expect }  = require('chai');
const request = require('supertest');



module.exports = genreTests = async(server,token) => {
    describe('Genres API', async () => {

       
    

        it('Shows all genres and they are empty', async () => {
            // console.log(token)
            const { body, status } = await request(server).get('/api/v1/genres').set({ 'x-auth-token': token });
            expect(status).to.equal(200);
            expect(body.length).to.equal(0)
        });


        it('Post one genre', async () => {

            const genre = {
                "imgUrl": "https://ct.cosm",
                "name": "Suspenso"
            }
            const { body, status } = await request(server).post('/api/v1/genres').set({ 'x-auth-token': token }).send(genre);
            expect(status).to.equal(201);
        });

        it('Not to post imgUrl not url genre', async () => {

            const genre = {
                "imgUrl": "photo",
                "name": "Suspenso"
            }
            const { body, status } = await request(server).post('/api/v1/genres').set({ 'x-auth-token': token }).send(genre);
            expect(status).to.equal(400);
            expect(body.name).to.equal("SequelizeValidationError")
        });

        it('Not to post name with numbers', async () => {

            const genre = {
                "imgUrl": "https://ct.cosm",
                "name": "Suspens2o"
            }
            const { body, status } = await request(server).post('/api/v1/genres').set({ 'x-auth-token': token }).send(genre);
            expect(status).to.equal(400);
        });


        it('Not to Post a missing field genre', async () => {

            const genre = {

                "name": "Acción"
            }
            const { body, status } = await request(server).post('/api/v1/genres').set({ 'x-auth-token': token }).send(genre);
            expect(status).to.equal(400);
            expect(body.name).to.equal("SequelizeValidationError")
        });

        it('Not to Post a duplicated field genre', async () => {

            const genre = {
                "imgUrl": "https://ct.cosm",
                "name": "Suspenso"
            }
            const { body, status } = await request(server).post('/api/v1/genres').set({ 'x-auth-token': token }).send(genre);
            expect(status).to.equal(400);
            expect(body.name).to.equal("SequelizeUniqueConstraintError")
        });

        let genreToBeFound;

        it('get all genres and they returns 1', async () => {
            const { body, status } = await request(server).get('/api/v1/genres').set({ 'x-auth-token': token });
            expect(status).to.equal(200);
            expect(body.length).to.equal(1)
            genreToBeFound = body[0]

        });

        it('get genre', async () => {
            const { body, status } = await request(server).get('/api/v1/genres/' + genreToBeFound.uuid).set({ 'x-auth-token': token });
            expect(status).to.equal(200);

        });

        it('patch genre ', async () => {
            const genre = {
                "name": "Accion"
            }
            const { body, status } = await request(server).patch('/api/v1/genres/' + genreToBeFound.uuid).set({ 'x-auth-token': token }).send(genre);
            expect(status).to.equal(204);

        });

        it('check genre changed ', async () => {
            const { body, status } = await request(server).get('/api/v1/genres/' + genreToBeFound.uuid).set({ 'x-auth-token': token });
            expect(status).to.equal(200);
            expect(body.name).to.equal("Accion")
        });

        let newGenre
        it('Delete genre', async () => {

            const genreToDelete = {
                "imgUrl": "https://ct.cosm",
                "name": "Aborrrarse"
            }
            const { body: genre, status: postStatus } = await request(server).post('/api/v1/genres').set({ 'x-auth-token': token }).send(genreToDelete);
            newGenre = genre
            expect(postStatus).to.equal(201);

            const { status: deleteStatus } = await request(server).delete(`/api/v1/genres/${newGenre.uuid}`).set({ 'x-auth-token': token });

            expect(deleteStatus).to.equal(204);

        });

        it('Not to Delete already deleted genre', async () => {

            const { status: deleteStatus } = await request(server).delete(`/api/v1/genres/${newGenre.uuid}`).set({ 'x-auth-token': token });

            expect(deleteStatus).to.equal(404);

        });
    });
}