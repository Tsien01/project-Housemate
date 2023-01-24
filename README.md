# project-Housemate

Tech stack - Typescript
Back-end:
framework: express
supporting libraries: dotenv, mongoose, jest, ts-node
producing seeding data: faker.js


# SETUP
for .env.test and .env.development, please create a variable MONGODATABASE with a string value that corresponds to the name of the respective database you want to associate with that .env (i.e. `MONGODATABASE = HousemateTest` for .env.test)

for .env.production, please create a variable MONGOURL with the connection link of your mongoDB database (i.e. `MONGOURL = <mongoDB link here>`)