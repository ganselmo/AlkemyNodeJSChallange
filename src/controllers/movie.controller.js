const { Movie } = require('../models')
const { Genre } = require('../models')

const errorFactory = require('../errors/ErrorFactory')
const getMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll(
            {
                include: [{
                    model: Genre,
                }]
            }
        )
        if (!movies) {
            return errorFactory.createError({ name: 'NotFoundError', message: 'No movies Found', uuid }, res)
        }
        return res.status(200).json(movies)

    } catch (error) {
        console.log(error)
        return errorFactory.createError(error, res)
    }
}
const getMovie = async (req, res) => {
    try {
        const { uuid } = req.params;
        const movie = await Movie.findByPk(uuid,
            {
                include: [{
                    model: Genre,
                }]
            })
        if (!movie) {
            return errorFactory.createError({ name: 'NotFoundError', message: 'Movie not found', uuid }, res)
        }
        return res.status(200).json(movie);
    } catch (error) {
        return errorFactory.createError(error, res)
    }
}
const createMovie = async (req, res) => {
    try {
        const { title, creationDate, genre_uuid, rating, imgUrl } = req.body
        const genre = await Genre.findByPk(genre_uuid)
        if (!genre) {
            return errorFactory.createError({ name: 'NotFoundError', message: 'Genre not found', genre_uuid }, res)
        }
        const movie = await Movie.create({ title, creationDate, genre_uuid, rating, imgUrl })
        movie.save()
        return res.status(201).json(movie)

    } catch (error) {
        console.log(error)
        return errorFactory.createError(error, res)

    }
}
const updateMovie = async (req, res) => {
    try {
        const { uuid } = req.params;
        const { title, creationDate, genre_uuid, rating, imgUrl } = req.body
        const movie = await Movie.findByPk(uuid)
        if (!movie) {
            return errorFactory.createError({ name: 'NotFoundError', message: 'Movie not found', uuid }, res)
        }
        if (genre_uuid) {

            const genre = await Genre.findByPk(genre_uuid)
            if (!genre) {
                return errorFactory.createError({ name: 'NotFoundError', message: 'Genre not found', uuid }, res)
            }
        }
        const [updated] = await Movie.update({ title, creationDate, genre_uuid, rating, imgUrl }, {
            where: {
                uuid
            }
        })
        if (!updated) {
            return errorFactory.createError({ name: 'ServerError', message: 'Movie was not updated', uuid }, res)
        }
        //RFC 5789
        return res.sendStatus(204)

    } catch (error) {
        errorFactory.createError(error, res)
    }
}
const deleteMovie = async (req, res) => {
    try {
        const { uuid } = req.params;
        const movie = await Movie.findByPk(uuid);

        if (!movie) {
            return errorFactory.createError({ name: 'NotFoundError', message: 'Movie not found', uuid }, res)
        }
        const deleted = await Movie.destroy({
            where: {
                uuid
            }
        })
        if (!deleted) {
            return errorFactory.createError({ name: 'ServerError', message: 'Movie was not deleted', uuid }, res)
        }
        return res.sendStatus(204)
    } catch (error) {
        return errorFactory.createError(error, res)
    }
}


module.exports = { getMovies, getMovie, createMovie, updateMovie, deleteMovie }