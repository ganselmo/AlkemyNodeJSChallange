const Router = require("express");
const { getCharacters, getCharacter, createCharacter, updateCharacter, deleteCharacter, getCharacterMovies,getCharactersByName } = require("../../controllers/character.controller");

const router = Router();





router.get('/',getCharacters)
router.get('/:uuid',getCharacter);
router.post('/',createCharacter);
router.patch('/:uuid',updateCharacter);
router.delete('/:uuid',deleteCharacter);

router.get('/:uuid/movies',getCharacterMovies);


module.exports = router;
