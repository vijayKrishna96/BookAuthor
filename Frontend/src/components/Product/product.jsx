import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../features/cart/cartSlice";
import ProductCard from "../ProductCard/ProductCard";

import { motion } from "framer-motion";
import { imageVariant } from "../../variants";
import { detailsVariant } from "../../variants";


export async function loader({ params }) {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/books/${params.bookId}`
  );
  const Book = response.data;

  const response2 = await axios.get(`${import.meta.env.VITE_API_URL}/books`);
  const Books = response2.data;
  return { Book, Books };
}

export default function Product(props) {
  const { Book, Books } = useLoaderData();
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [Book]);

  return (
    <main>
      <section className="container mx-auto py-16 h-[80vh] flex items-center justify-center">
        <div className="max-h-[35rem] grid grid-cols-2 items-center ">
          <motion.img src={Book.image} alt="" className="h-[35rem]" 
            variants={imageVariant}
            initial="hidden"
            animate="visible"
          />
          <motion.div className="table-row" variants={detailsVariant} initial="hidden" animate="visible">
            <h2 className="text-4xl font-bold mb-4">{Book.title}</h2>
            <h3 className="text-2xl font-semibold mb-4">Author ~ <span className="text-xl">{Book.author}</span> </h3>
            <p className="text-grey-600 mb-5">{Book.description}</p>
            <span className="text-2xl block">&#x20B9;{Book.price}</span> <br />
            <Link
              onClick={() => {
                dispatch(addItemToCart(Book));
              }}
              className="hover:bg-blue-400 bg-blue-500 inline-block text-white rounded-md px-4 py-2 hover-red"
            >
              Add to cart
            </Link>
          </motion.div>
        </div>
      </section>
      <section>
        <motion.div className="container mx-auto max-w-full m-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.6 } }}
          exit={{ opacity: 0, transition: { delay: 0.2, duration: 0.6 } }}
          viewport={{once: false , amount: 0.4}}
        >
          <div className="heading text-center mb-16 relative">
            <span className="text-5xl p-8 px-8 text-black font-semibold border bg-white">
              Recommended
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {Books.map((book) => (
               <div key={book._id}>
                <ProductCard book = {book} bookId = {book._id} />
               </div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
