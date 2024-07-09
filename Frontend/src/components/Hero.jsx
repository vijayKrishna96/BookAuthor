import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link, useLoaderData } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import "swiper/css";
import axios from "axios";
import { FaHeart, FaStar, FaStarHalf } from "react-icons/fa";
import NewsLetter from "./NewsLetter/newsLetter";
import Carousel from "./Carousel/Carousel";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../features/cart/cartSlice";
import { addToWishList, removeItems } from "../features/wishList/wishList";


export async function loader() {
  try {
    const response = await axios.get("http://localhost:3000/books/");
    const data = response.data;
    return data;
  } catch (error) {
    console.error("There was an error fetching the data!", error);
    return [];
  }
}

export default function Hero() {
  const Books = useLoaderData();
  const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState("default");
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (bookId) => {

    if (favorites.includes(bookId)) {
      setFavorites(favorites.filter((id) => id !== bookId));
      dispatch(removeItems(bookId._id));
    } else {
      setFavorites([...favorites, bookId]);
      dispatch(addToWishList(bookId));
    }
  };

  const randomizeArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const randomizedBooks = randomizeArray(Books);

  const sortedBooks = [...Books].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.price - b.price;
    } else if (sortOrder === "high-to-low") {
      return b.price - a.price;
    }
    return 0;
  });

  const swiperOptionsTwo = {
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      450: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
      1024: {
        slidesPerView: 5,
      },
    },
    loop: true,
    spaceBetween: 5,
  };

  const swiperOptionsThree = {
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      450: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
      },
    },
    loop: true,
    // centeredSlides: true,
    spaceBetween: 80,
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <>
      <section>
        <Carousel />
      </section>

      <section>
        <div className="popular my-14 container max-w-full">
          <div className="heading text-center mb-8 relative">
            <span className="text-3xl sm:text-4xl md:text-5xl  p-8 px-8 text-black font-semibold border bg-white">
              Popular Books
            </span>
          </div>
          <div className="flex flex-row-reverse gap-6 text-xl m-4">
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="border border-gray-300 rounded-md "
            >
              <option value="default">Price:&nbsp;&nbsp;Sort</option>
              <option value="low-to-high"> Low to High</option>
              <option value="high-to-low"> High to Low</option>
            </select>
            <Link to={"/products"}>
              <span className="text-blue-500">View More</span>
            </Link>
          </div>
          <div className="swiper ">
            <Swiper
              watchSlidesProgress={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              {...swiperOptionsTwo}
              className="popular-slider"
            >
              {sortedBooks.map((book) => (
                <SwiperSlide key={book._id} className="swiper-slide ">
                  <div className=" h-[26rem] w-[20rem] my-8 relative overflow-hidden bg-violet-100 rounded-lg shadow-lg p-6 text-center transition-transform duration-400 transform hover:scale-110 ">
                    <Link to={`/product/${book._id}`}>
                      <div className="image cursor-pointer flex flex-col items-center justify-center overflow-hidden">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="h-[15rem] p-4 object-cover"
                        />
                        <div className="">
                          <h3 className="text-md text-black">{book.title}</h3>
                          <div className="price text-xl text-black py-1 absolute left-1/2 transform -translate-x-1/2">
                            &#x20B9; {book.price}
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/*  */}

                    <div className="content">
                      <div className="text-3xl text-indigo-200 absolute bottom-6 left-2/2 transform -translate-x-2/2"
                       onClick={() => toggleFavorite(book)}
                       >
                        <FaHeart 
                            onClick={() => toggleFavorite(book)} 
                            className={`${
                              favorites.includes(book)
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                        />
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section>
        <NewsLetter />
      </section>

      {/* arrivals section */}

      <section className="arrivals container max-w-full">
        <div className="heading text-center mb-8 relative">
          <span className="text-3xl sm:text-4xl md:text-5xl p-8 px-8 text-black font-semibold border bg-white">
            New arrivals
          </span>
        </div>
        <div className="swiper ">
          <Swiper
            watchSlidesProgress={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="arrival-slider"
            {...swiperOptionsThree}
          >
            {Books.map((book) => (
              <SwiperSlide key={book._id} className="">
                <a
                  href="\#"
                  className="box h-60 w-[30rem] shadow-md transition-transform duration-400 transform hover:scale-110 m-2"
                >
                  <div className="image h-56 w-48">
                    <img className="h-full w-full" src={book.image} alt="" />
                  </div>
                  <div className="content">
                    <span className="text-xl">{book.title}</span>
                    <div className="text-xl mt-2">&#x20B9;{book.price}</div>
                    <div className="stars flex mt-4">
                      <i className="text-xl text-green-500">
                        <FaStar />
                      </i>
                      <i className="text-xl text-green-500">
                        <FaStar />
                      </i>
                      <i className="text-xl text-green-500">
                        <FaStar />
                      </i>
                      <i className="text-xl text-green-500">
                        <FaStar />
                      </i>
                      <i className="text-xl text-green-500">
                        <FaStarHalf />
                      </i>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            watchSlidesProgress={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="arrival-slider"
            {...swiperOptionsThree}
          >
            {randomizedBooks.map((book) => (
              <SwiperSlide key={book._id} className="">
                <a
                  href="#arrival"
                  className="box h-60 w-[30rem] shadow-md transition-transform duration-400 transform hover:scale-110 m-2"
                >
                  <div className="image h-56 w-48">
                    <img className="h-full w-full" src={book.image} alt="" />
                  </div>
                  <div className="content">
                    <span className="text-xl">{book.title}</span>
                    <div className="text-xl mt-2">&#x20B9;{book.price}</div>
                    <div className="stars flex ">
                      <i className="text-xl text-green-500">
                        <FaStar />
                      </i>
                      <i className="text-xl text-green-500">
                        <FaStar />
                      </i>
                      <i className="text-xl text-green-500">
                        <FaStar />
                      </i>
                      <i className="text-xl text-green-500">
                        <FaStar />
                      </i>
                      <i className="text-xl text-green-500">
                        <FaStarHalf />
                      </i>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="deal mt-8">
        <div className="container max-w-full content inline-block items-center">
          <h3 className="text-3xl sm:text-5xl text-white">Exiting offers on</h3>
          <h1 className="text-4xl sm:text-7xl text-white">Fiction</h1>
          <p className="px-4 text-lg  leading-loose text-white">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
            dolore nesciunt illum ipsa,
            <br />
            dolorum odit rem architecto quae vero sequi numquam quam, molestias
            error nam.
          </p>
          <a
            href=""
            className="bg-blue-500 hover:bg-blue-600 text-lg sm:text-xl text-white px-20 py-4 m-5 rounded-md inline-block"
          >
            Shop now
          </a>
        </div>
      </section>

      <section className="reviews container max-w-full mt-5">
        <div className="text-center mb-8 relative">
          <span className="heading text-3xl sm:text-4xl md:text-5xl p-8 px-8 text-black font-semibold border bg-white">
            client&apos;s reviews
          </span>
        </div>
        <div className="swiper">
          <Swiper
            watchSlidesProgress={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="review-slider"
            {...swiperOptionsThree}
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-slide box flex items-center text-center justify-center gap-6 p-8 border my-4 mt-12">
                  <div className="flex items-center text-center justify-center m-4">
                    <img
                      src=""
                      alt={`Image ${index + 1}`}
                      className="h-44 w-44 rounded-full"
                    />
                  </div>
                  <h2 className="text-xl">Name {index + 1}</h2>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Qui hic repellendus aperiam voluptas ea assumenda doloribus
                    vero? Obcaecati, cumque. Necessitatibus?
                  </p>
                  <div className="stars flex items-center justify-center m-4">
                    <i className="text-green-500 ">
                      <FaStar />
                    </i>
                    <i className="text-green-500">
                      <FaStar />
                    </i>
                    <i className="text-green-500">
                      <FaStar />
                    </i>
                    <i className="text-green-500">
                      <FaStar />
                    </i>
                    <i className="text-green-500">
                      <FaStarHalf />
                    </i>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}





    



