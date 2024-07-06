import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../features/cart/cartSlice";

export async function loader({ params }) {
  const response = await axios.get(
    `http://localhost:3000/books/${params.bookId}`
  );
  const Book = response.data;

  const response2 = await axios.get("http://localhost:3000/books");
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
      <section className="container mx-auto py-16 ">
        <div className="max-h-[35rem] grid grid-cols-2 items-center ">
          <img src={Book.image} alt="" className="h-[35rem]" />
          <div className="table-row">
            <h2 className="text-4xl font-bold mb-4">{Book.title}</h2>
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
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto max-w-full m-16">
          <div className="heading text-center mb-16 relative">
            <span className="text-5xl p-8 px-8 text-black font-semibold border bg-white">
              Recommended
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {Books.map((book) => (
              <div
                key={book.id}
                className="h-[27rem] w-[20rem] relative overflow-hidden bg-violet-100 rounded-lg shadow-lg p-6 text-center transition-transform duration-400 transform hover:scale-110"
              >
                <Link
                  to={`/product/${book._id}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <div className=" cursor-pointer flex flex-col items-center justify-center  overflow-hidden ">
                    <img
                      src={book.image}
                      alt=""
                      className="h-[15rem] p-4 object-cover"
                    />
                    <div className="">
                      <h3 className="text-lg text-black">{book.title}</h3>
                      <div className="price text-xl text-black py-1 absolute left-1/2 transform -translate-x-1/2">
                        &#x20B9; {book.price}
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="content ">
                  <div className="text-3xl text-indigo-200 absolute bottom-6 left-2/2 transform -translate-x-2/2">
                    <FaHeart />
                  </div>
                  <a
                    onClick={() => {
                      dispatch(addItemToCart(book));
                    }}
                    href="#"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md inline-block absolute bottom-6 left-2/2 transform -translate-x-2/2"
                  >
                    Add to Cart
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
