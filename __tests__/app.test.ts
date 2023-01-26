import { describe, it, expect, beforeEach, afterAll } from "@jest/globals";
import mongoose from "mongoose";
import { seed } from "../db/seeds/seed";
const request = require("supertest");
const app = require("../app");
// import {app} from "../app"

afterAll(() => {
  return mongoose.disconnect();
});

beforeEach(() => {
  return seed();
});

describe("GET /api/users/:user_id", () => {
  it("should return a user object with the key of user", () => {
    const user_id = "u11b18310-6636-4709-b0ee-2dd03e5b03ec";
    return request(app)
      .get(`/api/users/${user_id}`)
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toEqual(
          expect.objectContaining({
            user_id: "u11b18310-6636-4709-b0ee-2dd03e5b03ec",
            household_id: "hd1c6db69-2524-44ef-8870-52c2bc60e1e3",
            firstName: "Pierre",
            lastName: "Hudson",
            picture:
              "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/42.jpg",
            email: "Dawson_Wintheiser@gmail.com",
            hashed_password:
              "$2b$10$VHQP1/vF0R64mFTmqHJWd.wzkSoKqlcLlarJ3dseVGMuFbKzfUGgO",
            household_password: "antiqueequivalent",
            _id: expect.any(String)
          })
        );
      });
  });
});
