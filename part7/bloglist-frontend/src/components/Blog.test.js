import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;
  const blog = {
    author: "author",
    title: "title",
    url: "www.url.com",
    likes: 20,
  };
  beforeEach(() => {
    component = render(<Blog blog={blog} />);
  });
  test("blog mini view is rendered correctly", () => {
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).not.toHaveTextContent(blog.likes);
  });
  test("blog full view is rendered correctly", () => {
    const button = component.getByText("view");
    fireEvent.click(button);
    component.debug();
    expect(component.container).toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(blog.likes);
  });
});

describe("<Blog updateBlog={updateBlog}/>", () => {
  let component;
  const blog = {
    author: "author",
    title: "title",
    url: "www.url.com",
    likes: 20,
  };
  let likeHandler;
  beforeEach(() => {
    likeHandler = jest.fn();
    component = render(<Blog blog={blog} updateBlog={likeHandler} />);
  });

  test("likes is incremented", () => {
    const viewButton = component.getByText("view");
    fireEvent.click(viewButton);
    component.debug();
    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(likeHandler.mock.calls).toHaveLength(2);
    //   expect(createNote.mock.calls).toHaveLength(1);
  });
});
