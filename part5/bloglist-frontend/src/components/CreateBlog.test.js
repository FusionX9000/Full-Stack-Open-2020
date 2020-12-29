import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import CreateBlog from "./CreateBlog";

describe("<CreateBlog addBlog={addBlog} />", () => {
  let component;
  const blog = {
    author: "author",
    // title: "title",
    // url: "www.url.com",
  };
  let addBlog;
  beforeEach(() => {
    addBlog = jest.fn();
    component = render(<CreateBlog addBlog={addBlog} />);
  });

  test("new blog is submitted correctly", () => {
    const form = component.container.querySelector("form");
    const authorInput = component.container.querySelector("#author");
    const urlInput = component.container.querySelector("#url");
    const titleInput = component.container.querySelector("#title");

    fireEvent.change(authorInput, { target: { value: blog.author } });
    fireEvent.change(urlInput, { target: { value: blog.url } });
    fireEvent.change(titleInput, { target: { value: blog.title } });

    component.debug();
    fireEvent.submit(form);

    expect(addBlog.mock.calls).toHaveLength(1);
    const addedBlog = addBlog.mock.calls[0][0];
    expect(addedBlog).toMatchObject(blog);
  });
});
