import { db } from "../../db/connection";
import { householdObjectSchema } from "../../db/seeds/schemas/householdsSchema";

exports.updateHouseholdUsers = async (body) => {
  if (
    !body.hasOwnProperty("household_password") ||
    !body.hasOwnProperty("name") ||
    !body.hasOwnProperty("email")
  ) {
    return Promise.reject({ status: 400, message: "400 Bad Request" });
  }
  const dbHouseholdModel = await db.model("household", householdObjectSchema);
  const existingHouseholds = await dbHouseholdModel.find({
    "users.email": body.email,
  });

  const household = await dbHouseholdModel.find({
    household_password: body["household_password"],
  });
  if(household.length === 0) {
    return Promise.reject({ status: 404, message: "404 Not Found"})
  }

  if (existingHouseholds.length) {
    const userEmailsArray = household[0].users.map((user) => {
      return user.email;
    });

    const indexOfExistingUser = userEmailsArray.indexOf(body.email);

    household[0].users.splice(indexOfExistingUser, 1);
    await household[0].save();
  }

  household[0].users.push({
    name: body.name,
    currScore: 0,
    email: body.email,
    permissions: ["member"],
    picture: body.picture ? body.picture : "upload a picture",
  });
  await household[0].save();
  const updatedHousehold = await dbHouseholdModel.find({
    household_password: body["household_password"],
  });

  return updatedHousehold[0];
};
