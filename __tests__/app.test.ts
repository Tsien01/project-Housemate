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

const err400: string = "400 Bad Request";

const err401: string = "401 Unauthorised";

const err404: string = "404 Not Found";

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
            _id: expect.any(String),
          })
        );
      });
  });
  it("should return a 404 if email format is valid but doesn't exist", () => {
    const user_email = "bobbyb@gmail.com";
    return request(app)
      .get(`/api/users/${user_email}`)
      .expect(404)
      .then(({ body: { error } }) => {
        expect(error.message).toBe("404 Not Found");
      });
  });
  it("should return a 400 if email format is invalid", () => {
    const user_email = 892;
    return request(app)
      .get(`/api/users/${user_email}`)
      .expect(400)
      .then(({ body: { error } }) => {
        expect(error.message).toBe(`400 Bad Request`);
      });
  });
});

describe("POST /api/users/authentication", () => {
  it("should return status 200, the users email and a household object that matches the posted object", () => {
    const body = {
      email: "Shaun.Beatty65@yahoo.com",
      password: "sugaryrock",
    };
    return request(app)
      .post(`/api/users/authentication`)
      .send(body)
      .expect(200)
      .then(({ body: household }) => {
        expect(household).toEqual(
          expect.objectContaining({
            email: expect.any(String),
            household: expect.objectContaining({
              name: expect.any(String),
              household_password: expect.any(String),
              description: expect.any(String),
              users: expect.any(Array),
              tasks: expect.any(Array),
              currWinner: expect.any(String),
            }),
          })
        );
      });
  });
  it("should return a 400 and a Bad req message if request is invalid", () => {
    const body = {
      email: "bobbyb@gmail.com",
      password: "Whatever",
      animals: "lions",
    };
    return request(app)
      .post(`/api/users/authentication`)
      .send(body)
      .expect(400)
      .then(({ body: { error } }) => {
        expect(error.message).toBe("400 Bad Request");
      });
  });
  it(`should return a 401 and a Unauthorised if valid email, but password doesnt match`, () => {
    const body = {
      email: "Wilhelm_Wiegand57@hotmail.com",
      password: "9245862",
    };
    return request(app)
      .post(`/api/users/authentication`)
      .send(body)
      .expect(401)
      .then(({ body: { error } }) => {
        expect(error.message).toBe("401 Unauthorised");
      });
  });
});

describe("POST /api/users", () => {
  it("should return a 201 and an object containing the email if the user was succesfully registered", () => {
    const body = {
      email: "larrygary@outlook.com",
      password: "larrygarypassword",
    };
    return request(app)
      .post(`/api/users/`)
      .send(body)
      .expect(201)
      .then(({ body: { user } }) => {
        expect(user.email).toBe("larrygary@outlook.com");
      });
  });
  it("should return 400 and an error if provided an invalid request", () => {
    const body = {
      email: "gg@com",
      password: "31283812",
      message: "DROP TABLES",
    };
    return request(app)
      .post(`/api/users/`)
      .send(body)
      .expect(400)
      .then(({ body: { error } }) => {
        expect(error.message).toBe(err400);
      });
  });
});

describe("POST /api/households/:household_name", () => {
  it("should return a 200, the users email, and a household object if successful", () => {
    const body = {
      household_password: "murkyrecognition",
      name: "Pratik Gurung",
      email: "Pratiksemail@bing.com",
    };
    return request(app)
      .post(`/api/households/Osinski_household`)
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
              currWinner: expect.any(String),
            }),
          })
        );
      });
  });
  it("should return a 400 bad request if request body is invalid", () => {
    const body = {
      request: "DROP TABLES",
      email: "evilUser@evil",
      deadline: "world domination",
    };
    return request(app)
      .post(`/api/households/Osinski_household`)
      .send(body)
      .expect(400)
      .then(({ body: { error } }) => {
        expect(error.message).toBe(err400);
      });
  });
  it("should return a 404 not found if household name doesnt match", () => {
    const body = {
      household_password: "murkyrecognition",
      name: "Pratik Gurung",
      email: "Pratiksemail@bing.com",
    };
    return request(app)
      .post(`/api/households/Bobbys_household`)
      .send(body)
      .expect(404)
      .then(({ body: { error } }) => {
        expect(error.message).toBe(err404);
      });
  });
  it("should should return 401 unauthorised if household password doesnt match", () => {
    const body = {
      household_password: "notAPassword",
      name: "Pratik Gurung",
      email: "Pratiksemail@bing.com",
    };
    return request(app)
      .post(`/api/households/Johnson_household`)
      .send(body)
      .expect(401)
      .then(({ body: { error } }) => {
        expect(error.message).toBe(err401);
      });
  });
});

describe("POST /api/households", () => {
  it("status 200: should return posted household with user added", () => {
    const body = {
      email: "Shaun.Beatty65@yahoooooooooooooooooooooooo.com",
      userName: "Lukas Krajcik",
      household_name: "New Household",
      household_password: "newpassword",
    };
    return request(app)
      .post(`/api/households`)
      .send(body)
      .expect(200)
      .then(({ body: { household } }) => {
        expect(household).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            household_password: expect.any(String),
            users: expect.any(Array),
            tasks: expect.any(Array),
          })
        );
      });
  });
  it("status 400: invalid request body", () => {
    const body = {
      email: "Shaun.Beatty65@yahooooooooooooo.com",
      userName: "Lukas Krajcik",
      household_password: "newpassword",
    };
    return request(app)
      .post(`/api/households`)
      .send(body)
      .expect(400)
      .then(({ body: { error } }) => {
        expect(error.message).toBe(err400);
      });
  });
});

describe("PATCH /api/households/:household_name", () => {
  it("status 200: should return patched household with new user added", () => {
    const body = {
      email: "Shaun.Beatty65@yahoo.com",
      userName: "Lukas Krajcik",
      name: "New Household",
      household_password: "newpassword"
    };
    return request(app)
      .patch(`/api/households/:household_id`)
      .send(body)
      .expect(200)
      .then(({ body: { household } }) => {
        expect(household).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            household_password: expect.any(String),
            users: expect.any(Array),
            tasks: expect.any(Array),
          })
      );
    })
  })
  it("should return a 400 bad request if request body is invalid", () => {
    const body = {
      request: "DROP TABLES",
      email: "evilUser@evil",
      deadline: "world domination",
    };
    return request(app)
      .patch(`/api/households/Osinski_household`)
      .send(body)
      .expect(400)
      .then(({ body: { error } }) => {
        expect(error.message).toBe(err400);
      });
  });
  it("should return a 404 not found if household name doesnt match", () => {
    const body = {
      household_password: "murkyrecognition",
      name: "Pratik Gurung",
      email: "Pratiksemail@bing.com",
    };
    return request(app)
      .patch(`/api/households/Bobbys_household`)
      .send(body)
      .expect(404)
      .then(({ body: { error } }) => {
        expect(error.message).toBe(err404);
      });
  });
  it("should return 401 unauthorised if household password doesnt match", () => {
    const body = {
      household_password: "notAPassword",
      name: "Pratik Gurung",
      email: "Pratiksemail@bing.com",
    };
    return request(app)
      .patch(`/api/households/Johnson_household`)
      .send(body)
      .expect(401)
      .then(({ body: { error } }) => {
        expect(error.message).toBe(err401);
      });
  });
});

describe('PATCH /api/households/:household_name/tasks', () => {
  it('status 200: responds with updated household object', () => {
    const body = {
      "email": "Louie24@yahoo.com",
        "created_at": "2023-01-26T11:11:31.569Z",
        "deadline": null,
        "title": "parsing",
        "description": "Use the cross-platform OCR monitor, then you can copy the open-source system!",
        "completion": true, //changed here
        "task_value": 4,
        "tags": []
    }
    return request(app)
      .patch("/api/households/Krajcik_household/tasks")
      .send(body)
      .expect(200)
      .then(({ body: { household }}) => {
        expect(household).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            household_password: expect.any(String),
            users: expect.any(Array),
            tasks: expect.any(Array),
          })
        )
      })
  });
});

describe('DELETE /api/households/:household_name/tasks', () => {
  it('status 204: no content', () => {
    return request(app)
      .delete(`/api/households/Krajcik_household/tasks`)
      .expect(204)
      .then(({ body }) => {
        expect(body).toBe(undefined)
      })
  });
});

describe('POST /api/households/:household_name/tasks', () => {
  it('status 200: responds with updated household object', () => {
    const body = {
      email: "Louie24@yahoo.com", 
      created_at: Date(), 
      deadline: "24/7/2023", 
      title: "cleaning", 
      description: "", 
      completion: false, 
      task_value: 4, 
      tags: [], 
    }
    return request(app)
      .post(`/api/households/Krajcik_household/tasks`)
      .send(body)
      .expect(200)
      .then(({ body: { household }}) => {
        expect(household).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            household_password: expect.any(String),
            users: expect.any(Array),
            tasks: expect.any(Array),
          })
        )
      })
  });
  it('status 400: missing fields', () => {
    const body = {
      created_at: Date(), 
      deadline: "24/7/2023", 
      description: "", 
      completion: false, 
      task_value: 4, 
      tags: [], 
    }
    return request(app)
      .post(`/api/households/Krajcik_household/tasks`)
      .send(body)
      .expect(400)
      .then(({ body: { error }}) => {
        expect(error.message).toBe(err400)
      })
  });
});

describe('DELETE /api/households/:household_name', () => {
  it('status 204: no content', () => {
    return request(app)
      .delete(`/api/households/users/Louie24@yahoo.com`)
      .expect(204)
  });
});