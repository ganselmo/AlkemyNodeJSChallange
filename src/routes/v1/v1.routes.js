const authRoutes = require('./auth.routes');
const moviesRoutes = require('./movies.routes');
const genreRoutes= require('./genre.routes');
const caracterRoutes= require('./character.routes');
const Router = require("express");
const router = Router();
const { verifyToken } = require("../../middlewares/verifyToken.middleware");
const { containsToken } = require("../../middlewares/containsToken.middleware");

router.use("/api/v1/auth",authRoutes);
router.use("/api/v1/genres",containsToken,verifyToken,genreRoutes);
router.use("/api/v1/movies",containsToken,verifyToken,moviesRoutes);
router.use("/api/v1/characters",containsToken,verifyToken,caracterRoutes);
module.exports= router;