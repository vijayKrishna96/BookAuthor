// import React, { useState } from "react";
// import { FaHeart } from "react-icons/fa";
// import { useLoaderData } from "react-router-dom";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addItemToCart } from "../../features/cart/cartSlice";
// import { addToWishList } from "../../features/wishList/wishList";

// export async function loader() {
//   try {
//     const response = await axios.get("http://localhost:3000/books/");
//     const data = response.data;
//     return data;
//   } catch (error) {
//     console.error("There was an error fetching the data!", error);
//     return [];
//   }
// }

// export default function Products() {
//   const Books = useLoaderData();
//   const dispatch = useDispatch();

//   const [sortOrder, setSortOrder] = useState("default");

//   const sortedBooks = [...Books].sort((a, b) => {
//     if (sortOrder === "low-to-high") {
//       return a.price - b.price;
//     } else if (sortOrder === "high-to-low") {
//       return b.price - a.price;
//     }
//     return 0;
//   });

//   const handleSortChange = (event) => {
//     setSortOrder(event.target.value);
//   };

//   return (
//     <div className="container mx-auto max-w-full m-14">
//       <div className="flex flex-row-reverse gap-6 text-xl m-12">
//         <select
//           value={sortOrder}
//           onChange={handleSortChange}
//           className="border border-gray-300 rounded-md "
//         >
//           <option value="default">Price:&nbsp;&nbsp;Sort</option>
//           <option value="low-to-high"> Low to High</option>
//           <option value="high-to-low"> High to Low</option>
//         </select>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
//         {sortedBooks.map((book) => (
//           <div
//             key={book.id}
//             className="h-[27rem] w-[20rem]relative overflow-hidden bg-violet-100 rounded-lg shadow-lg p-6 text-center transition-transform duration-400 transform hover:scale-110"
//           >
//             <Link to={`/product/${book._id}`}>
//               <div className=" cursor-pointer flex flex-col items-center justify-center  overflow-hidden">
//                 <img
//                   src={book.image}
//                   alt=""
//                   className="h-[15rem] p-4 object-cover"
//                 />
//                 <div className="m-3">
//                   <h3 className="text-lg text-black">{book.title}</h3>
//                   <div className="price text-xl text-black py-1 absolute left-1/2 transform -translate-x-1/2">
//                     &#x20B9; {book.price}
//                   </div>
//                 </div>
//               </div>
//             </Link>

//             <div className="content ">
//               <div className="text-3xl text-indigo-200 absolute bottom-6 left-2/2 transform -translate-x-2/2">
//                 <FaHeart onClick={()=> dispatch(addToWishList(book))}/>
//               </div>
//               <a
//                 onClick={() => {
//                   dispatch(addItemToCart(book));
//                 }}
//                 href="#"
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md inline-block absolute bottom-6 left-2/2 transform -translate-x-2/2"
//               >
//                 Add to Cart
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../features/cart/cartSlice";
import { addToWishList, removeItems } from "../../features/wishList/wishList";


export async function loader() {
  try {
    const response = await axios.get("http://localhost:3000/books/");
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

  const toggleFavorite = (book ) => {
    if (isInWishList(book)) {
      dispatch(removeItems(book));
    } else {
      dispatch(addToWishList(book));
    }
  };

  return (
    <div className="container mx-auto max-w-full m-14">
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
          <div
            key={book._id}
            className="h-[27rem] w-[20rem] relative overflow-hidden bg-violet-100 rounded-lg shadow-lg p-6 text-center transition-transform duration-400 transform hover:scale-110"
          >
            <Link to={`/product/${book._id}`}>
              <div className="cursor-pointer flex flex-col items-center justify-center overflow-hidden">
                <img
                  src={book.image}
                  alt=""
                  className="h-[15rem] p-4 object-cover"
                />
                <div className="m-3">
                  <h3 className="text-lg text-black">{book.title}</h3>
                  <div className="price text-xl text-black py-1 absolute left-1/2 transform -translate-x-1/2">
                    &#x20B9; {book.price}
                  </div>
                </div>
              </div>
            </Link>

            <div className="content">
              <div className="text-3xl text-indigo-200 absolute bottom-6 left-2/2 transform -translate-x-2/2">
                <FaHeart
                  onClick={() => toggleFavorite(book)}
                  className={`cursor-pointer ${
                    isInWishList(book) ? "text-red-500" : "text-gray-400"
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
        ))}
      </div>
    </div>
  );
}
