import mongoose from "mongoose";
import app from "../app.js";
import request from "supertest";

const { DB_HOST, PORT = 3000 } = process.env;

describe("test api/users/login", () => {
    let server = null;
    beforeAll(async () => {
        await mongoose.connect(DB_HOST);
        server = app.listen(PORT);
    })
    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    })

    test("response with status 200, token and user object with email and subscribtion as string in case of successfull login", async () => {
        const loginData = {
            email: "m@ukr.net",
            password: "123"
        }
        const { statusCode, body } = await request(app).post("/api/users/login").send(loginData);
        expect(statusCode).toBe(200);
        expect(body.token).not.toBeNull();
        expect(body.user.email).toBeTruthy();
        expect(body.user.subscription).toBeTruthy();
        expect((typeof body.user.email) === "string").toBeTruthy();
        expect((typeof body.user.subscription) === "string").toBeTruthy();
    }
    )
});