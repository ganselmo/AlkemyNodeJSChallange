const Router = require("express");
const { getGenres, getGenre, createGenre, updateGenre, deleteGenre } = require("../../controllers/genre.controller");

const router = Router();

router.get('/',getGenres)
router.get('/:uuid',getGenre);
router.post('/',createGenre);
router.patch('/:uuid',updateGenre);
router.delete('/:uuid',deleteGenre);

module.exports = router;

