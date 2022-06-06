const express = require('express')
// import authRoutes from './routes/auth.routes.js'
// import moviesRoutes from './routes/movies.routes.js'
// import characterRoutes from './routes/character.routes.js'
// import genreRoutes from './routes/genre.routes.js'

const app = express()

//middlewares
app.use(express.json())

//routers
// app.use(routes);
// app.use(taskRoutes);

module.exports = app