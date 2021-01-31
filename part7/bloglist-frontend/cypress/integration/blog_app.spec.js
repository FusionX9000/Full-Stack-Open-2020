describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login");
    cy.contains("username");
    cy.contains("password");
  });
  describe("Login", function () {
    const user = {
      username: "samurai",
      password: "hunter1",
      name: "Johnny Silverhand",
    };
    beforeEach(() => {
      cy.request("POST", "http://localhost:3003/api/users", user);
    });
    it("it succeeds with correct credientials", function () {
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.get("#login-button").click();
      cy.contains("logged in");
    });
    it("it fails with incorrect credientials", function () {
      cy.get("#username").type("randomuser");
      cy.get("#password").type("randompass");
      cy.get("#login-button").click();
      cy.contains("wrong username or password");
    });
    describe("When logged in", () => {
      beforeEach(() => {
        cy.login(user.username, user.password);
      });
      it("A blog can be created", () => {
        const blog = {
          title: "Title of blog",
          author: "Salman",
          url: "www.example.com",
        };
        cy.contains("create new blog").click();
        cy.get("#title").type(blog.title);
        cy.get("#author").type(blog.author);
        cy.get("#url").type(blog.url);
        cy.get("#create-button").click();
        cy.get(".blogs-list").contains(`${blog.title} ${blog.author}`);
      });
      describe("When blog is created", () => {
        const blog = {
          title: "Title of blog",
          author: "Salman",
          url: "www.example.com",
        };
        beforeEach(() => {
          cy.createBlog(blog);
        });
        it("User can like a blog", () => {
          cy.contains(`${blog.title} ${blog.author}`).as("blog");
          cy.get("@blog").contains("view").click();
          cy.get("@blog").get(".like-button").click();
          cy.contains(`${blog.title}`).parent().contains("likes 1");
        });
        it("User can delete that blog", () => {
          cy.contains(`${blog.title} ${blog.author}`).as("blog");
          cy.get("@blog").contains("view").click();
          cy.get("@blog").get(".remove-button").click();
          cy.get(".blogs-list").should("not.contain", `${blog.title}`);
        });
      });
      it("User cannot delete other user's blog", () => {
        const newBlog = {
          author: "test",
          title: "test",
          url: "test",
        };
        cy.request("POST", "http://localhost:3003/api/users", {
          username: "test",
          password: "test",
        });
        cy.request("POST", "http://localhost:3003/api/login", {
          username: "test",
          password: "test",
        })
          .then((response) => {
            const token = response.body.token;
            cy.request({
              method: "POST",
              url: "http://localhost:3003/api/blogs",
              body: {
                author: newBlog.author,
                title: newBlog.title,
                url: newBlog.url,
              },
              headers: { Authorization: `Bearer ${token}` },
            });
          })
          .then(() => cy.visit("http://localhost:3000/"));
        cy.contains(`${newBlog.title} ${newBlog.author}`).as("blog");
        cy.get("@blog").contains("view").click();
        cy.get("@blog").should("not.contain", "remove").click();
        cy.get(".blogs-list").contains(`${newBlog.title}`);
      });
      it("Blogs are sorted by likes", () => {
        const blog = {
          author: "Salman",
          title: "No Title",
          url: "url",
        };
        const len = 10;
        let blogs = [];
        for (let i = 0; i < len; i++) {
          blogs.push({
            ...blog,
            title: blog.title + new Date().toString(),
            likes: Math.floor(Math.random() * 10),
          });
          cy.createBlog(blogs[i]);
        }
        blogs = blogs.sort((a, b) => b.likes - a.likes);

        for (let i = 0; i < len; i++) {
          let el = `.blogs-list div:nth-child(${i + 1})`;
          cy.get(el).contains("view").click();
          cy.get(el)
            .contains("likes")
            .invoke("text")
            .then((text) => Number(text.split(" ")[1]))
            .should("be.eq", blogs[i].likes);
        }
        cy.visit("http://localhost:3000");
      });
    });
  });
});
