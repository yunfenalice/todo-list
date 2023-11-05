const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server"); //import our app
const expect = chai.expect;

chai.use(chaiHttp);

describe("todo list test", () => {
  it("should return all todo tasks", (done) => {
    const isCompleted = true;
    chai
      .request(app)
      .get(`/api/v1/tasks?isCompleted=${isCompleted}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an("object");
        expect(res.body.status).to.equal("success");
        expect(res.body.data.tasks).to.be.an("array");
        done();
      });
  });
  it("should return all done tasks", (done) => {
    const isCompleted = false;
    chai
      .request(app)
      .get(`/api/v1/tasks?isCompleted=${isCompleted}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an("object");
        expect(res.body.status).to.equal("success");
        expect(res.body.data.tasks).to.be.an("array");
        done();
      });
  });
  it("should update a todo", (done) => {
    chai
      .request(app)
      .patch("/api/v1/tasks/6546bef8a7a99f937d851786")
      .send({ isCompleted: true })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should add a new todo", (done) => {
    chai
      .request(app)
      .post("/api/v1/tasks")
      .send({ text: "New Todo" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data.task.text).to.equal("New Todo");
        done();
      });
  });

  it("should delete a todo", (done) => {
    chai
      .request(app)
      .delete("/api/v1/tasks")
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});
