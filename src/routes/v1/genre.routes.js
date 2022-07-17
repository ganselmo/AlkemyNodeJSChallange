const Router = require("express");
const { getGenres, getGenre, createGenre, updateGenre, deleteGenre,getGenreMovies} = require("../../controllers/genre.controller");

const router = Router();

router.get('/',getGenres)
router.get('/:uuid',getGenre);
router.post('/',createGenre);
router.patch('/:uuid',updateGenre);
router.delete('/:uuid',deleteGenre);

router.get('/movies/:uuid',getGenreMovies);

module.exports = router;

