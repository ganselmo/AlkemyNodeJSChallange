const { Movie } = require('../models')
const { Genre } = require('../models')
const { Character } = require('../models')
const errorFactory = require('../errors/ErrorFactory')
const { buildWhereClause } = require("../helpers/queryToModel.helper")
const { Op } = require('sequelize')
const getMovies = async (req, res) => {
    try {

        const { title, idGenre, order } = req.query

        const whereClause = buildWhereClause([{ name: "title", value: title, op: "substring" }, { name: "genre_uuid", value: idGenre, op: "eq" }])

        const orderClause = (order==="ASC"||order==="DESC")?[['creationDate', order]]:undefined

        const movies = await Movie.findAll(
            {
                attributes: ['imgUrl', 'title', 'creationDate'],
                where: {
                    [Op.and]:
                        whereClause

                },
                order:orderClause,
            }
        )
        if (!movies) {
            return errorFactory.createError({ name: 'NotFoundError', message: 'No movies Found', uuid }, res)
        }
        return res.status(200).json(movies)

    } catch (error) {
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
                    as: "genre"
                },
                {
                    model: Character,
                    as: "characters"
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

        const { characters } = req.body


        const genre = await Genre.findByPk(genre_uuid)
        if (!genre) {
            return errorFactory.createError({ name: 'NotFoundError', message: 'Genre not found', genre_uuid }, res)
        }
        const movie = await Movie.create({ title, creationDate, genre_uuid, rating, imgUrl })

        if (characters) {

            const characterUUIDs = characters.map(character =>
                character.uuid
            )
            movie.setCharacters(characterUUIDs)
        }
        movie.save()
        return res.status(201).json(movie)

    } catch (error) {
        return errorFactory.createError(error, res)

    }
}
const updateMovie = async (req, res) => {
    try {
        const { uuid } = req.params;
        const { title, creationDate, genre_uuid, rating, imgUrl } = req.body
        const { characters } = req.body

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
        let charactersUpdated;
        if (characters) {
            const characterUUIDs = characters.map(character =>
                character.uuid
            )
            charactersUpdated = movie.setCharacters(characterUUIDs)
        }
        const [updated] = await Movie.update({ title, creationDate, genre_uuid, rating, imgUrl }, {
            where: {
                uuid
            }
        })
        if (!updated && !charactersUpdated) {
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
const getMovieCharacters = async (req, res) => {

    const { uuid } = req.params;
    const movie = await Movie.findByPk(uuid, {
        include: [
            {
                model: Character,
                as: "characters"
            }]
    });

    if (!movie) {
        return errorFactory.createError({ name: 'NotFoundError', message: 'Movie not found', uuid }, res)
    }

    return res.status(200).json(movie.characters);
}

module.exports = { getMovies, getMovie, createMovie, updateMovie, deleteMovie, getMovieCharacters }