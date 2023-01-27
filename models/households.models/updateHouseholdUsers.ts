import { db } from "../../db/connection";
//import { loginRegister } from "../db/seeds/schemas/loginRegisterSchema";
import { householdObjectSchema } from "../../db/seeds/schemas/householdsSchema";

exports.updateHouseholdUsers = async (body) => {
  const dbHouseholdModel = await db.model("household", householdObjectSchema);

  const existingHouseholds = await dbHouseholdModel.find({
    "users.email": "Louie24@yahoo.com",
  });

  const household = await dbHouseholdModel.find({
    household_password: body["household_password"],
  });

  //if(household) {}

  
  if (existingHouseholds.length) {
    const userEmailsArray = household[0].users.map((user) => {
      return user.email;
    });

    const indexOfExistingUser = userEmailsArray.indexOf(body.email);

    household[0].users.splice(indexOfExistingUser, 1);
    console.log(household[0].users);
    await household[0].save();
  }

  household[0].users.push({
    name: body.name,
    currScore: 0,
    email: body.email,
    permissions: ["member"],
    picture: body.picture? body.picture: "upload a picture",
  });
  await household[0].save();
  const updatedHousehold = await dbHouseholdModel.find({
    household_password: body["household_password"],
  });


//hardcoded user props when adding user to existing household
// currScore: 0,
// permissions: ["member"],
// picture: "hello",
