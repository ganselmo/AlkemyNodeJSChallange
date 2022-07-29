# AlkemyNodeJSChallange

This is a Monolitic API example project developed by Gerónimo Anselmo following Alkemy NodeJs challange.

The API contains CRUD functionality to interact with genres, movies, and characters. It provides authentication for users thru JWT. The user must be logged in for interaction with data.

Api Documentation can be found on the below Link:

https://app.swaggerhub.com/apis/ganselmo/AlkemyChallangeNodeJS/1.0.1

Tech stack used:

Node Js 
Express.js
JavaScript Web Token
Sequelize as ORM
PostgreSql
Docker
Mocha + Chai + nyc + supertest
SendGrid

Instructions to Run environment

1. Clone Repository
2. Create .env file on the root folder from .env.example completing the fields.
4. Create Postgress DB using docker-compose example file completing the fields.
5. Serve DB 
6. Create a config.json file from config-example.json
7. Complete all fields.
8. Execute npm i 
9. Execute npm run dev (optionaly, npm run dev:watch to use nodemon)


Instructions to execute API Tests

1. Clone Repository
2. Create an .env file on the test folder from .env.example completing the fields.
4. Create Postgress DB using docker-compose example file completing the fields.
5. Serve DB 
6. Create a config.json file from config-example.json
7. Complete all fields.
8. Execute npm i to install dependencies
9. Execute npm run test (optionaly for npm run test:watch to allow mocha watch for changes)
9. Execute npm run coverage to check project coverage