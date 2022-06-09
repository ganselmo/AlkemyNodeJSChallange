const Router = require("express");
const { getMovies } = require("../controllers/movies.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");
const { containsToken } = require("../middlewares/containsToken.middleware");

const router = Router();

router.get('**',containsToken,verifyToken,getMovies);

module.exports = router;

