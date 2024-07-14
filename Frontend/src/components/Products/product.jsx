
import React, { useState  } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeItems } from "../../features/wishList/wishList";

//Motion
import { motion } from 'framer-motion'
import ProductCard from "../ProductCard/ProductCard";

export async function loader() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data!", error);
    return [];
  }
}

export default function Products() {
  const Books = useLoaderData();
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishlist);
  const [sortOrder, setSortOrder] = useState("default");

  const sortedBooks = [...Books].sort((a, b) => {
    if (sortOrder === "low-to-high") return a.price - b.price;
    if (sortOrder === "high-to-low") return b.price - a.price;
    return 0;
  });

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const isInWishList = (book) => {
    return Array.isArray(wishList) && wishList.some((item) => item._id === book._id);
    // return wishList.some((item) => item._id === book._id);
  };


  
  return (
    <motion.div className="container mx-auto max-w-full m-14"
      // initial = {{opacity : 0}}
      // animate = {{opacity: 1}}
      // exit = {{opacity : 0}}

      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.6 } }}
      exit={{ opacity: 0, transition: { delay: 0.2, duration: 0.6 } }}
      
    >
      <div className="flex flex-row-reverse gap-6 text-xl m-12">
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="border border-gray-300 rounded-md"
        >
          <option value="default">Price: Sort</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
        {sortedBooks.map((book) => (
            <div key={book._id}>
                <ProductCard book = {book} bookId = {book._id} />
            </div>
        ))}
      </div>
    </motion.div>
  );
}
