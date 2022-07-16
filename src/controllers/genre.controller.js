const { Genre } = require('../models')
const errorFactory = require('../errors/ErrorFactory')
const getGenres = async (req, res) => {

    try {
        const genres = await Genre.findAll()
        if (!genres) {
            return errorFactory.createError({name:'NotFoundError',uuid}, res)
        }
        return res.status(200).json(genres)

    } catch (error) {
        return errorFactory.createError(error, res)
    }
}
const getGenre = async (req, res) => {
    try {
        const { uuid } = req.params;
        const genre = await Genre.findByPk(uuid)
        if (!genre) {
            return errorFactory.createError({name:'NotFoundError',uuid}, res)
        }
        return res.status(200).json(genre);
    } catch (error) {
        return errorFactory.createError(error, res)
    }
}
const createGenre = async (req, res) => {
    try {
        const { name, imgUrl } = req.body
        const genre = await Genre.create({ name, imgUrl })
        genre.save()
        return res.status(201).json(genre)

    } catch (error) {
        return errorFactory.createError(error, res)

    }
}
const updateGenre = async (req, res) => {
    try {
        const { uuid } = req.params;
        const { name, img } = req.body
        const genre = await Genre.findByPk(uuid)
        if (!genre) {
            return errorFactory.createError({name:'NotFoundError',uuid}, res)
        }
        const [updated] =await Genre.update({ name, img }, {
            where: {
                uuid
            }
        })
        if(!updated){
            return errorFactory.createError({name:'ServerError',uuid}, res)
        }
        //RFC 5789
        return res.sendStatus(204)

    } catch (error) {
        errorFactory.createError(error, res)
    }
}
const deleteGenre = async (req, res) => {
    try {
        const { uuid } = req.params;
        const genre = await Genre.findByPk(uuid);

        if (!genre) {
            return errorFactory.createError({name:'NotFoundError',uuid}, res)
        }
        const deleted = await Genre.destroy({
            where: {
                uuid
            }
        })
        if (!deleted) {
            return errorFactory.createError({name:'ServerError',uuid}, res)
        }
        return res.sendStatus(204)
    } catch (error) {
        return errorFactory.createError(error, res)
    }
}


module.exports = { getGenres, getGenre, createGenre, updateGenre, deleteGenre }