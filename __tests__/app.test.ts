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

const err400: string = "400 Bad Request"

const err401: string = "401 Unauthorised"

const err404: string = "404 Not Found"

describe("GET /api/users/:user_email", () => {
  it("should return a user object with the key of user", () => {
      const email = "Shaun.Beatty65@yahoo.com";
      return request(app)
      .get(`/api/users/${email}`)
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toEqual(
          expect.objectContaining({
            email: expect.any(String),
            hashed_password: expect.any(String),
            _id: expect.any(String)
          })
          );
        });
      });
    it("should return a 404 if email format is valid but doesn't exist", () => {
      const user_email = "bobbyb@gmail.com"
      return request(app)
      .get(`/api/users/${user_email}`)
      .expect(404)
      .then(({body:{error}}) => {
        expect(error.message).toBe('404 Not Found')
      })
    })     
    it('should return a 400 if email format is invalid', () => {
      const user_email = 892
      return request(app)
        .get(`/api/users/${user_email}`)
        .expect(400)
        .then(({body:{error}}) => {
          expect(error.message).toBe(`400 Bad Request`)
        })
    });
});
describe('POST /api/users/authentication', () => {
  it('should return status 200, the users email and a household object that matches the posted object', () => {
    const body = {
      email: "Shaun.Beatty65@yahoo.com", 
      password: "sugaryrock"
    }
    return request(app)
      .post(`/api/users/authentication`)
      .send(body)
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toEqual(
          expect.objectContaining({
            email: expect.any(String), 
            household: expect.objectContaining({
              name: expect.any(String), 
              household_password: expect.any(String), 
              description: expect.any(String), 
              users: expect.any(Array), 
              tasks: expect.any(Array), 
              currWinner: expect.any(String)
            })
          })
        )
      })
    });
    it('should return a 400 and a Bad req message if request is invalid', () => {
      const body = {
        email: "bobbyb@gmail.com", 
        password: "Whatever", 
        animals: "lions", 

      }
      return request(app)
        .post(`/api/users/authentication`)
        .send(body)
        .expect(400)
        .then(({ body: { error }}) => {
          expect(error.message).toBe("400 Bad Request")
        })
    });
    it(`should return a 401 and a Unauthorised if valid email, but password doesnt match`, () => {
      const body = {
        email: "Wilhelm_Wiegand57@hotmail.com", 
        password: "9245862"
      }
      return request(app)
        .post(`/api/users/authentication`)
        .send(body)
        .expect(401)
        .then(({ body: { error }}) => {
          expect(error.message).toBe("401 Unauthorised")
        })
    });
});
