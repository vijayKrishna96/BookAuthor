import axios from "axios";
import React, { useState } from "react";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

    async function  handleSubmit(event) {
    event.preventDefault();
    try {
      const bookData = { title, price, image, description, author };
      const response = await axios.post("http://localhost:3000/books", bookData);
      setMessage(response.data.message);
      alert(response.data.message); 

      setTitle("");
      setPrice("");
      setImage("");
      setDescription("");
      setAuthor("");
    } catch (error) {
      console.error("Error adding book: ", error);
      alert("Error adding book"); 
    }
  }

  return (
    <main>
      <section className="container mx-auto py-20">
        <h2 className="font-bold text-4xl">Add New Book</h2>
        <form
          onSubmit={handleSubmit} 
          className="flex flex-col gap-4 py-20"
        >
          <label htmlFor="title">Title</label>
          <input
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            type="text"
            className="p-2 border border-grey-800"
          />
          <label htmlFor="price">Price</label>
          <input
            onChange={(event) => setPrice(event.target.value)}
            value={price}
            type="number"
            className="p-2 border border-grey-800"
          />
          <label htmlFor="image">Image</label>
          <input
            onChange={(event) => setImage(event.target.value)}
            value={image}
            type="text"
            className="p-2 border border-grey-800"
          />
          <label htmlFor="description">Description</label>
          <textarea
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            name="description"
            id="description"
            className="p-2 border border-grey-800"
          ></textarea>
          <label htmlFor="author">Author</label>
          <input
            onChange={(event) => setAuthor(event.target.value)} 
            value={author}
            type="text"
            className="p-2 border border-grey-800"
          />
          <button
            className="py-5 bg-red-600 text-white rounded-md"
            type="submit"
          >
            Add Book
          </button>
        </form>
      </section>
    </main>
  );
}
