require('dotenv').config()
const app = require('./app.js')
const {sequelize} = require('./models/index')
const { API_PORT } = process.env;

const port = process.env.PORT || API_PORT;

const main = async () => {

    try {
        await sequelize.sync({force:true});
        console.log('Connection has been established successfully.');
        app.listen(3000)//agregar .env
        console.log(`Server is running on port ${port}`)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}

main()
