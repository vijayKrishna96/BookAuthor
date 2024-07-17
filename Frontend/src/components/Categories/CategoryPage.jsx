import axios from "axios";
import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { motion } from "framer-motion";

export async function loader({ params }) {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/books?category=${params.categoryId}`
  );
  const books = response.data;

  const response2 = await axios.get(
    `${import.meta.env.VITE_API_URL}/category/${params.categoryId}`
  );
  const category = response2.data;

  return { books, category }; // Ensure it returns an object with books key
}

export default function CategoryPage(props) {
  const {books , category} = useLoaderData();
  const book = books ?? []; // Default to an empty array if books is undefined

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.6 } }}
      exit={{ opacity: 0, transition: { delay: 0.2, duration: 0.6 } }}
    >
      <div className="container mx-auto max-w-full m-12">
        <h1 className="text-3xl">{category.categoryName}</h1>
        </div>
      
      <main className="container h-[100vh] max-w-full mx-auto grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        
        {book.length > 0 ? (
          books.map((book) => (
            <div key={book._id}  className="">
              <ProductCard book={book} bookId={book._id} />
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </main>
    </motion.div>
  );
}
