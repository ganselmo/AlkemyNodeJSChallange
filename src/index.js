const app = require('./app.js')

const {sequelize} = require('./models/index')

const main = async () => {

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        app.listen(3000)//agregar .env
        console.log("Server is running on port 3000")
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}

main()
