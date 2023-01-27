import mongoose from "mongoose";

export interface HouseholdUsersObjectInterface {
  currScore: number;
  name: string;
  picture: string;
  email: string;
  permissions: ["admin" | "member"];
}

export const householdUsersSchema =
  new mongoose.Schema<HouseholdUsersObjectInterface>({
    permissions: { type: [String]},
    currScore: { type: Number },
    name: { type: String },
    picture: { type: String },
    email: { type: String, match: /^\S+@\S+\.\S+$/ },
  });
