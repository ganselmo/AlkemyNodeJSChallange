const Router = require("express");
const { getCharacters, getCharacter, createCharacter, updateCharacter, deleteCharacter } = require("../../controllers/character.controller");

const router = Router();

router.get('/',getCharacters)
router.get('/:uuid',getCharacter);
router.post('/',createCharacter);
router.patch('/:uuid',updateCharacter);
router.delete('/:uuid',deleteCharacter);

module.exports = router;
