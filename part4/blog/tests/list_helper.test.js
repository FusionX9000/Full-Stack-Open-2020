const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = dummy(blogs);
  expect(result).toBe(1);
});

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

describe("total likes", () => {
  test("of empty list is 0", () => {
    expect(totalLikes([])).toBe(0);
  });
  test("when list has only one blog equals like of that", () => {
    expect(totalLikes(listWithOneBlog)).toBe(5);
  });
  test("of a bigger list is calculated right", () =>
    expect(totalLikes(blogs)).toBe(36));
});

describe("favorite blog", () => {
  test("of empty list is null", () => expect(favoriteBlog([])).toEqual(null));
  test("when list has single blog is same as that blog", () =>
    expect(favoriteBlog(listWithOneBlog)).toEqual({
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes,
    }));
  test("of a bigger list is calculated right", () =>
    expect(favoriteBlog(blogs)).toEqual({
      title: blogs[2].title,
      author: blogs[2].author,
      likes: blogs[2].likes,
    }));
});

describe("author with most blogs", () => {
  test("of empty list is null", () => expect(mostBlogs([])).toEqual(null));
  test("when list has single blog is same as that blog", () =>
    expect(mostBlogs(listWithOneBlog)).toEqual({
      author: listWithOneBlog[0].author,
      blogs: 1,
    }));
  test("of a bigger list is calculated right", () =>
    expect(mostBlogs(blogs)).toEqual({ author: "Robert C. Martin", blogs: 3 }));
});

describe("author with most likes", () => {
  test("of empty list is null", () => expect(mostLikes([])).toEqual(null));
  test("when list has single blog is same as that blog", () =>
    expect(mostLikes(listWithOneBlog)).toEqual({
      author: listWithOneBlog[0].author,
      likes: 5,
    }));
  test("of a bigger list is calculated right", () =>
    expect(mostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    }));
});
