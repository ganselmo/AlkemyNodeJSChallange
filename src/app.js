const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const moviesRoutes = require('./routes/movies.routes');
// import moviesRoutes from './routes/movies.routes.js'
// import characterRoutes from './routes/character.routes.js'
// import genreRoutes from './routes/genre.routes.js'

const app = express()

//middlewares
app.use(cors());
app.use(express.json())

//routers
app.use("/api/auth",authRoutes);
app.get("/api/movies",moviesRoutes)
// app.use(routes);
// app.use(taskRoutes);

module.exports = app