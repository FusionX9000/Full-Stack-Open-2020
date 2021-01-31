const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => blogs.reduce((sum, item) => sum + item.likes, 0);
const favoriteBlog = (blogs) => {
  let favoriteBlog = null;
  blogs.forEach(
    (blog) =>
      (favoriteBlog = favoriteBlog
        ? blog.likes > favoriteBlog.likes
          ? blog
          : favoriteBlog
        : blog)
  );
  return favoriteBlog
    ? {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes,
      }
    : null;
};

const mostBlogs = (blogs) => {
  const authorBlogs = {};
  let authorMaxBlog = null;
  blogs.forEach((blog) => {
    const author = blog.author;
    const count = (authorBlogs[author] || 0) + 1;
    authorBlogs[author] = count;
    authorMaxBlog = authorMaxBlog
      ? count > authorBlogs[authorMaxBlog]
        ? author
        : authorMaxBlog
      : author;
  });
  return authorMaxBlog
    ? { author: authorMaxBlog, blogs: authorBlogs[authorMaxBlog] }
    : null;
};

const mostLikes = (blogs) => {
  const authorLikes = {};
  let authorMaxLikes = null;
  blogs.forEach((blog) => {
    const author = blog.author;
    const count = (authorLikes[author] || 0) + blog.likes;
    authorLikes[author] = count;
    authorMaxLikes = authorMaxLikes
      ? count > authorLikes[authorMaxLikes]
        ? author
        : authorMaxLikes
      : author;
  });
  return authorMaxLikes
    ? { author: authorMaxLikes, likes: authorLikes[authorMaxLikes] }
    : null;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
