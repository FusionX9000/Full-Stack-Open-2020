describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Johnny Silverhand",
      username: "samurai",
      password: "hunter1",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University Of Helsinki"
    );
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });
  it("user can log in", function () {
    cy.contains("login").click();
    cy.get("#username").type("samurai");
    cy.get("#password").type("hunter1");
    cy.get("#login-button").click();

    cy.contains("logged in");
  });
  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "samurai", password: "hunter1" });
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });
    describe("and a note exists", function () {
      beforeEach(function () {
        cy.createNote({
          content: "another note cypress",
          important: false,
        });
      });

      it("it can be made important", function () {
        cy.contains("another note cypress")
          .contains("mark as important")
          .click();

        cy.contains("another note cypress").contains("mark as unimportant");
      });
    });
    describe.only("and several notes exist", function () {
      beforeEach(function () {
        cy.createNote({ content: "first note", important: false });
        cy.createNote({ content: "second note", important: false });
        cy.createNote({ content: "third note", important: false });
      });

      it("other of those can be made important", function () {
        cy.contains("second note").parent().find("button").as("theButton");
        cy.get("@theButton").click();
        cy.get("@theButton").should("contain", "mark as unimportant");
      });
    });
  });
  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");
    cy.get("html").should("not.contain", "Matti Luukkainen logged in");
  });
});
