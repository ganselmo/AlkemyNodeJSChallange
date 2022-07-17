const Router = require("express");
const { getMovies, getMovie, createMovie, updateMovie, deleteMovie } = require("../../controllers/movie.controller");

const router = Router();

router.get('/',getMovies)
router.get('/:uuid',getMovie);
router.post('/',createMovie);
router.patch('/:uuid',updateMovie);
router.delete('/:uuid',deleteMovie);

module.exports = router;

