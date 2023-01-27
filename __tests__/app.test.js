"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("@jest/globals");
var mongoose_1 = require("mongoose");
var seed_1 = require("../db/seeds/seed");
var request = require("supertest");
var app = require("../app");
// import {app} from "../app"
(0, globals_1.afterAll)(function () {
    return mongoose_1.default.disconnect();
});
(0, globals_1.beforeEach)(function () {
    return (0, seed_1.seed)();
});
var err400 = "400 Bad Request";
var err401 = "401 Unauthorised";
var err404 = "404 Not Found";
(0, globals_1.describe)("GET /api/users/:user_email", function () {
    (0, globals_1.it)("should return a user object with the key of user", function () {
        var email = "Shaun.Beatty65@yahoo.com";
        return request(app)
            .get("/api/users/".concat(email))
            .expect(200)
            .then(function (_a) {
            var user = _a.body.user;
            (0, globals_1.expect)(user).toEqual(globals_1.expect.objectContaining({
                email: globals_1.expect.any(String),
                hashed_password: globals_1.expect.any(String),
                _id: globals_1.expect.any(String),
            }));
        });
    });
    (0, globals_1.it)("should return a 404 if email format is valid but doesn't exist", function () {
        var user_email = "bobbyb@gmail.com";
        return request(app)
            .get("/api/users/".concat(user_email))
            .expect(404)
            .then(function (_a) {
            var error = _a.body.error;
            (0, globals_1.expect)(error.message).toBe("404 Not Found");
        });
    });
    (0, globals_1.it)("should return a 400 if email format is invalid", function () {
        var user_email = 892;
        return request(app)
            .get("/api/users/".concat(user_email))
            .expect(400)
            .then(function (_a) {
            var error = _a.body.error;
            (0, globals_1.expect)(error.message).toBe("400 Bad Request");
        });
    });
});
(0, globals_1.describe)("POST /api/users/authentication", function () {
    (0, globals_1.it)("should return status 200, the users email and a household object that matches the posted object", function () {
        var body = {
            email: "Shaun.Beatty65@yahoo.com",
            password: "sugaryrock",
        };
        return request(app)
            .post("/api/users/authentication")
            .send(body)
            .expect(200)
            .then(function (_a) {
            var household = _a.body;
            (0, globals_1.expect)(household).toEqual(globals_1.expect.objectContaining({
                email: globals_1.expect.any(String),
                household: globals_1.expect.objectContaining({
                    name: globals_1.expect.any(String),
                    household_password: globals_1.expect.any(String),
                    description: globals_1.expect.any(String),
                    users: globals_1.expect.any(Array),
                    tasks: globals_1.expect.any(Array),
                    currWinner: globals_1.expect.any(String),
                }),
            }));
        });
    });
    (0, globals_1.it)("should return a 400 and a Bad req message if request is invalid", function () {
        var body = {
            email: "bobbyb@gmail.com",
            password: "Whatever",
            animals: "lions",
        };
        return request(app)
            .post("/api/users/authentication")
            .send(body)
            .expect(400)
            .then(function (_a) {
            var error = _a.body.error;
            (0, globals_1.expect)(error.message).toBe("400 Bad Request");
        });
    });
    (0, globals_1.it)("should return a 401 and a Unauthorised if valid email, but password doesnt match", function () {
        var body = {
            email: "Wilhelm_Wiegand57@hotmail.com",
            password: "9245862",
        };
        return request(app)
            .post("/api/users/authentication")
            .send(body)
            .expect(401)
            .then(function (_a) {
            var error = _a.body.error;
            (0, globals_1.expect)(error.message).toBe("401 Unauthorised");
        });
    });
});
globals_1.describe.only("POST /api/users", function () {
    (0, globals_1.it)("should return a 201 and an object containing the email if the user was succesfully registered", function () {
        var body = {
            email: "larrygary@outlook.com",
            password: "larrygarypassword",
        };
        return request(app)
            .post("/api/users/")
            .send(body)
            .expect(201)
            .then(function (_a) {
            var user = _a.body.user;
            (0, globals_1.expect)(user.email).toBe("larrygary@outlook.com");
        });
    });
    (0, globals_1.it)("should return 400 and an error if provided an invalid request", function () {
        var body = {
            email: "gg@com",
            password: "31283812",
            message: "DROP TABLES",
        };
        return request(app)
            .post("/api/users/")
            .send(body)
            .expect(400)
            .then(function (_a) {
            var error = _a.body.error;
            (0, globals_1.expect)(error.message).toBe(err400);
        });
    });
});
(0, globals_1.describe)("POST /api/households/:household_name", function () {
    (0, globals_1.it)("should return a 200, the users email, and a household object if successful", function () {
        var body = {
            household_password: "murkyrecognition",
            name: "Pratik Gurung",
            email: "Pratiksemail@bing.com",
        };
        return request(app)
            .post("/api/households/Osinski_household")
            .send(body)
            .expect(200)
            .then(function (_a) {
            var user = _a.body.user;
            (0, globals_1.expect)(user).toEqual(globals_1.expect.objectContaining({
                email: globals_1.expect.any(String),
                household: globals_1.expect.objectContaining({
                    name: globals_1.expect.any(String),
                    household_password: globals_1.expect.any(String),
                    description: globals_1.expect.any(String),
                    users: globals_1.expect.any(Array),
                    tasks: globals_1.expect.any(Array),
                    currWinner: globals_1.expect.any(String),
                }),
            }));
        });
    });
    (0, globals_1.it)("should return a 400 bad request if request body is invalid", function () {
        var body = {
            request: "DROP TABLES",
            email: "evilUser@evil",
            deadline: "world domination",
        };
        return request(app)
            .post("/api/households/Osinski_household")
            .send(body)
            .expect(400)
            .then(function (_a) {
            var error = _a.body.error;
            (0, globals_1.expect)(error.message).toBe(err400);
        });
    });
    (0, globals_1.it)("should return a 404 not found if household name doesnt match", function () {
        var body = {
            household_password: "murkyrecognition",
            name: "Pratik Gurung",
            email: "Pratiksemail@bing.com",
        };
        return request(app)
            .post("/api/households/Bobbys_household")
            .send(body)
            .expect(404)
            .then(function (_a) {
            var error = _a.body.error;
            (0, globals_1.expect)(error.message).toBe(err404);
        });
    });
    (0, globals_1.it)("should should return 401 unauthorised if household password doesnt match", function () {
        var body = {
            household_password: "notAPassword",
            name: "Pratik Gurung",
            email: "Pratiksemail@bing.com",
        };
        return request(app)
            .post("/api/households/Johnson_household")
            .send(body)
            .expect(401)
            .then(function (_a) {
            var error = _a.body.error;
            (0, globals_1.expect)(error.message).toBe(err401);
        });
    });
});
(0, globals_1.describe)("POST /api/households", function () {
    (0, globals_1.it)("status 200: should return posted household with user added", function () {
        var body = {
            email: "Shaun.Beatty65@yahoo.com",
            userName: "Lukas Krajcik",
            name: "New Household",
            household_password: "newpassword",
        };
        return request(app)
            .post("/api/households")
            .send(body)
            .expect(200)
            .then(function (_a) {
            var household = _a.body.household;
            (0, globals_1.expect)(household).toEqual(globals_1.expect.objectContaining({
                name: globals_1.expect.any(String),
                household_password: globals_1.expect.any(String),
                users: globals_1.expect.any(Array),
                tasks: globals_1.expect.any(Array),
            }));
        });
    });
    (0, globals_1.it)("status 400: invalid request body", function () {
        var body = {
            email: "Shaun.Beatty65@yahoo.com",
            userName: "Lukas Krajcik",
            name: "New Household",
            household_password: "newpassword",
        };
        return request(app)
            .post("/api/households")
            .send(body)
            .expect(400)
            .then(function (_a) {
            var error = _a.body.error;
            (0, globals_1.expect)(error.message).toBe(err400);
        });
    });
});
(0, globals_1.describe)("PATCH /api/households/:household_name", function () {
    (0, globals_1.it)("status 200: should return patched household with new user added", function () {
        var body = {
            email: "Shaun.Beatty65@yahoo.com",
            userName: "Lukas Krajcik",
            name: "New Household",
            household_password: "newpassword",
        };
        return request(app)
            .patch("/api/households/:household_id")
            .send(body)
            .expect(200)
            .then(function (_a) {
            var household = _a.body.household;
            (0, globals_1.expect)(household).toEqual(globals_1.expect.objectContaining({
                name: globals_1.expect.any(String),
                household_password: globals_1.expect.any(String),
                users: globals_1.expect.any(Array),
                tasks: globals_1.expect.any(Array),
            }));
        });
    });
    (0, globals_1.it)("should return a 400 bad request if request body is invalid", function () {
        var body = {
            request: "DROP TABLES",
            email: "evilUser@evil",
            deadline: "world domination",
        };
        return request(app)
            .patch("/api/households/Osinski_household")
            .send(body)
            .expect(400)
            .then(function (_a) {
            var error = _a.body.error;
            (0, globals_1.expect)(error.message).toBe(err400);
        });
    });
    (0, globals_1.it)("should return a 404 not found if household name doesnt match", function () {
        var body = {
            household_password: "murkyrecognition",
            name: "Pratik Gurung",
            email: "Pratiksemail@bing.com",
        };
        return request(app)
            .patch("/api/households/Bobbys_household")
            .send(body)
            .expect(404)
            .then(function (_a) {
            var error = _a.body.error;
            (0, globals_1.expect)(error.message).toBe(err404);
        });
    });
    (0, globals_1.it)("should return 401 unauthorised if household password doesnt match", function () {
        var body = {
            household_password: "notAPassword",
            name: "Pratik Gurung",
            email: "Pratiksemail@bing.com",
        };
        return request(app)
            .patch("/api/households/Johnson_household")
            .send(body)
            .expect(401)
            .then(function (_a) {
            var error = _a.body.error;
            (0, globals_1.expect)(error.message).toBe(err401);
        });
    });
});
(0, globals_1.describe)("PATCH /api/households/:household_name/tasks", function () {
    (0, globals_1.it)("status 200: responds with updated household object", function () {
        var body = {
            email: "Louie24@yahoo.com",
            created_at: "2023-01-26T11:11:31.569Z",
            deadline: null,
            title: "parsing",
            description: "Use the cross-platform OCR monitor, then you can copy the open-source system!",
            completion: true,
            task_value: 4,
            tags: [],
        };
        return request(app)
            .patch("/api/households/Krajcik_household/tasks")
            .expect(200)
            .then(function (_a) {
            var household = _a.body.household;
            (0, globals_1.expect)(household).toEqual(globals_1.expect.objectContaining({
                name: globals_1.expect.any(String),
                household_password: globals_1.expect.any(String),
                users: globals_1.expect.any(Array),
                tasks: globals_1.expect.any(Array),
            }));
        });
    });
});
(0, globals_1.describe)("DELETE /api/households/:household_name/tasks", function () {
    (0, globals_1.it)("status 204: no content", function () {
        return request(app)
            .delete("/api/households/Krajcik_household/tasks")
            .expect(204)
            .then(function (_a) {
            var body = _a.body;
            (0, globals_1.expect)(body).toBe(undefined);
        });
    });
});
(0, globals_1.describe)("POST /api/households/:household_name/tasks", function () {
    (0, globals_1.it)("status 200: responds with updated household object", function () {
        var body = {
            email: "Louie24@yahoo.com",
            created_at: Date(),
            deadline: "24/7/2023",
            title: "cleaning",
            description: "",
            completion: false,
            task_value: 4,
            tags: [],
        };
        return request(app)
            .post("/api/households/Krajcik_household/tasks")
            .send(body)
            .expect(200)
            .then(function (_a) {
            var household = _a.body.household;
            (0, globals_1.expect)(household).toEqual(globals_1.expect.objectContaining({
                name: globals_1.expect.any(String),
                household_password: globals_1.expect.any(String),
                users: globals_1.expect.any(Array),
                tasks: globals_1.expect.any(Array),
            }));
        });
    });
    (0, globals_1.it)("status 400: missing fields", function () {
        var body = {
            created_at: Date(),
            deadline: "24/7/2023",
            description: "",
            completion: false,
            task_value: 4,
            tags: [],
        };
        return request(app)
            .post("/api/households/Krajcik_household/tasks")
            .send(body)
            .expect(400)
            .then(function (_a) {
            var error = _a.body.error;
            (0, globals_1.expect)(error.message).toBe(err400);
        });
    });
});
(0, globals_1.describe)("DELETE /api/households/:household_name", function () {
    (0, globals_1.it)("status 204: no content", function () {
        return request(app)
            .delete("/api/households/Krajcik_household/users/Louie24@yahoo.com")
            .expect(204)
            .then(function (response) {
            (0, globals_1.expect)(response.body).toBe(undefined);
        });
    });
});
//# sourceMappingURL=app.test.js.map