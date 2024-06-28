import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./productCard";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const response = await axios.get("http://localhost:3000/books");
  const Books = response.data;
  return { Books };
}

export default function Home() {
  const { Books } = useLoaderData();
  return (
    <main>
      <section className="container mx-auto py-16">
        <h2 className="text-4xl font-bold">Books</h2>
        <div className="grid grid-cols-4 gap-20 mt-8">
          {Books.map((book) => (
            <ProductCard key={book._id} book={book} />
          ))}
        </div>
      </section>
    </main>
  );
}
