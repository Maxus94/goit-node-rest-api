import mongoose from "mongoose";
import app from "./app.js";
import request from "supertest";

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe("test api/users/login", () => {
    let server = null;
    beforeAll(async () => {
        await mongoose.connect(DB_TEST_HOST);
        server = api.listen(PORT);
    })
    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    })

    test("response with status 200 in case of successfull login", async ()=>{}
    )
});