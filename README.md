# project-Housemate

Tech stack - Typescript
Back-end:
framework: express
supporting libraries: dotenv, mongoose, jest, ts-node
producing seeding data: faker.js


# SETUP
for .env.test and .env.development, please create a variable MONGODATABASE with a string value that corresponds to the name of the respective database you want to associate with that .env (i.e. `MONGODATABASE = HousemateTest` for .env.test)

for .env.production, please create a variable MONGOURL with the connection link of your MongoAtlas database (i.e. `MONGOURL = <mongoDB link here>`), a USER variable with your database users User Name, which needs to be in lower case, and a PASS variable with your database users password. 