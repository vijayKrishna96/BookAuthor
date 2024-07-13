import React, { useState , useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link, useLoaderData } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import "swiper/css";
import axios from "axios";
import {  FaStar, FaStarHalf } from "react-icons/fa";
import NewsLetter from "./NewsLetter/newsLetter";
import Carousel from "./Carousel/Carousel";
// import { useDispatch } from "react-redux";
// import { addItemToCart } from "../features/cart/cartSlice";
// import { addToWishList, removeItems } from "../features/wishList/wishList";

//Motion
import { motion } from "framer-motion";
// variants
import { fadeInRotate, FadeIn } from "../variants";
import ProductCard from "./ProductCard/ProductCard";

export async function loader() {
  try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        throw new Error('API URL is not defined in the environment variables');
      }
    const response = await axios.get(`${apiUrl}/books/`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("There was an error fetching the data!", error);
    return [];
  }
}

export default function Hero() {
  const Books = useLoaderData();
  // const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState("default");
  

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  return (
    <>
      <section>
        <motion.div
          variants={FadeIn("down", 0.2)}
          initial="hidden"
          animate="show"
          whileInView="show"
          viewport={{ once: true, amount: 0.8 }}
        >
          <Carousel />
        </motion.div>
      </section>

      <section>
        <motion.div
          className="popular my-14 container max-w-full"
          variants={FadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          whileInView="show"
          viewport={{ once: true, amount: 0.8 }}
        >
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
            <Link to={"/products"}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
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
                <SwiperSlide key= {book._id} className="swiper-slide ">
                   <ProductCard  book = {book} bookId={book._id}/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </section>

      <section>
        <NewsLetter />
      </section>

      {/* arrivals section */}

      <section className="arrivals container max-w-full">
        <motion.div
          variants={fadeInRotate(0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.4 }}
        >
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
        </motion.div>
      </section>

      <section className="deal mt-8">
        <motion.div
          variants={FadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.8 }}
        >
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
        </motion.div>
      </section>

      <section className="reviews container max-w-full mt-5">
        <div className="text-center mb-8 relative">
          <span className="heading text-3xl sm:text-4xl md:text-5xl p-8 px-8 text-black font-semibold border bg-white">
            client&apos;s reviews
          </span>
        </div>
        <motion.div className="swiper"
          variants={FadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.8 }}
        >
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
        </motion.div>
      </section>
    </>
  );
}
