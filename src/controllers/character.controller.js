const { Character } = require('../models')
const { Movie } = require('../models')
const { Genre } = require('../models')
const errorFactory = require('../errors/ErrorFactory')
const { Op } = require("sequelize");

const { buildWhereClause} = require("../helpers/queryToModel.helper")

const getCharacters = async (req, res) => {
    try {
        const { name, age, weight, movie } = req.query

        const whereClause = buildWhereClause([{ name: "name", value: name, op: "substring" }, { name: "age", value: age, op: "eq" }, { name: "weight", value: weight, op: "eq" }])


        const joinClause = (movie) ? {
            model: Movie,
            as: "movies",
            where: {
                uuid: movie
            },
            attributes: []
        } : undefined


        const characters = await Character.findAll({
            attributes: ['imgUrl', 'name'],
            where: {
                [Op.and]:
                    whereClause

            },
            include: joinClause
        })
        if (!characters) {
            return errorFactory.createError({ name: 'NotFoundError', message: 'No characters Found', uuid }, res)
        }
        return res.status(200).json(characters)

    } catch (error) {
        return errorFactory.createError(error, res)
    }
}
const getCharacter = async (req, res) => {
    try {
        const { uuid } = req.params;
        const character = await Character.findByPk(uuid,
            {
                include: [{
                    model: Movie,
                    as: "movies",
                    include: {
                        model: Genre,
                        as: "genre",
                    }
                }]
            })
        if (!character) {
            return errorFactory.createError({ name: 'NotFoundError', message: 'Character not found', uuid }, res)
        }
        return res.status(200).json(character);
    } catch (error) {
        return errorFactory.createError(error, res)
    }
}
const createCharacter = async (req, res) => {
    try {
        const { imgUrl, name, age, weight, story } = req.body
        const { movies } = req.body
        const character = await Character.create({ imgUrl, name, age, weight, story })

        if (movies) {
            const moviesUUIDs = movies.map(movie =>
                movie.uuid
            )
            character.setMovies(moviesUUIDs)
        }
        character.save()
        return res.status(201).json(character)

    } catch (error) {
        return errorFactory.createError(error, res)

    }
}
const updateCharacter = async (req, res) => {
    try {
        const { uuid } = req.params;
        const { imgUrl, name, age, weight, story } = req.body
        const { movies } = req.body
        const character = await Character.findByPk(uuid)
        if (!character) {
            return errorFactory.createError({ name: 'NotFoundError', message: 'Character not found', uuid }, res)
        }
        let moviesUpdated;
        if (movies) {
            const moviesUUIDs = movies.map(movie =>
                movie.uuid
            )
            moviesUpdated = await character.setMovies(moviesUUIDs)
        }
        const [updated] = await Character.update({ imgUrl, name, age, weight, story }, {
            where: {
                uuid
            }
        })
        if (!updated && !moviesUpdated) {
            return errorFactory.createError({ name: 'ServerError', message: 'Character was not updated', uuid }, res)
        }
        //RFC 5789
        return res.sendStatus(204)

    } catch (error) {
        errorFactory.createError(error, res)
    }
}
const deleteCharacter = async (req, res) => {
    try {
        const { uuid } = req.params;
        const character = await Character.findByPk(uuid);

        if (!character) {
            return errorFactory.createError({ name: 'NotFoundError', message: 'Character not found', uuid }, res)
        }
        const deleted = await Character.destroy({
            where: {
                uuid
            }
        })
        if (!deleted) {
            return errorFactory.createError({ name: 'ServerError', message: 'Character was not deleted', uuid }, res)
        }
        return res.sendStatus(204)
    } catch (error) {
        return errorFactory.createError(error, res)
    }
}


const getCharacterMovies = async (req, res) => {
    const { uuid } = req.params;
    const character = await Character.findByPk(uuid, {
        include: [
            {
                model: Movie,
                as: "movies"
            }]
    });

    if (!character) {
        return errorFactory.createError({ name: 'NotFoundError', message: 'Character not found', uuid }, res)
    }

    return res.status(200).json(character.movies);
}



module.exports = { getCharacters, getCharacter, createCharacter, updateCharacter, deleteCharacter, getCharacterMovies }