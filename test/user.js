let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
let server = require("../app");

describe("User Controller", () => {
    describe("/GET User List API", () => {
        it("it should GET list of all the users.", (done) => {
            chai.request(server.mainserver)
                .get("/userList")
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a("object");
                    done();
                });
        });
    });

    describe("/POST User signup", () => {
        it("User should signup", (done) => {
            chai.request(server.mainserver)
                .post("/addUser")
                .send({
                        "firstName":"Harish",
                        "lastName":"Mahajan",
                        "emailId": "harish@gmail.com",
                        "phoneNo":"123123123",
                        "password":"Harish@123"
                }).
                end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        })
    });
});