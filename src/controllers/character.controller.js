const { Character } = require('../models')
const { Genre } = require('../models')

const errorFactory = require('../errors/ErrorFactory')

const getCharacters = async (req, res) => {
    try {
        const characters = await Character.findAll()
        if (!characters) {
            return errorFactory.createError({ name: 'NotFoundError', message: 'No characters Found', uuid }, res)
        }
        return res.status(200).json(characters)

    } catch (error) {
        console.log(error)
        return errorFactory.createError(error, res)
    }
}
const getCharacter = async (req, res) => {
    try {
        const { uuid } = req.params;
        const character = await Character.findByPk(uuid)
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
        const { imgUrl,name, age, weight, story } = req.body
     
        const character = await Character.create({ imgUrl,name, age, weight, story })
        character.save()
        return res.status(201).json(character)

    } catch (error) {
        console.log(error)
        return errorFactory.createError(error, res)

    }
}
const updateCharacter = async (req, res) => {
    try {
        const { uuid } = req.params;
        const { imgUrl,name, age, weight, story} = req.body
        const character = await Character.findByPk(uuid)
        if (!character) {
            return errorFactory.createError({ name: 'NotFoundError', message: 'Character not found', uuid }, res)
        }
        const [updated] = await Character.update({ imgUrl,name, age, weight, story }, {
            where: {
                uuid
            }
        })
        if (!updated) {
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


module.exports = { getCharacters, getCharacter, createCharacter, updateCharacter, deleteCharacter }