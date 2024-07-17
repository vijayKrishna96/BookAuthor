import React,{useState} from "react";
import { addItemToCart } from "../../features/cart/cartSlice";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToWishList, removeItems } from "../../features/wishList/wishList";


export default function ProductCard({book , bookId}) {

  const dispatch = useDispatch()

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (bookId) => {
    if (favorites.includes(bookId)) {
      setFavorites(favorites.filter((id) => id !== bookId));
      dispatch(removeItems(bookId));
    } else {
      setFavorites([...favorites, bookId]);
      dispatch(addToWishList(bookId));
    }
  };
 
    // const book = props.book;
  return (
    <div className=" h-[26rem] w-[20rem] my-8 relative overflow-hidden bg-violet-100 rounded-lg shadow-lg p-6 text-center transition-transform duration-400 transform hover:scale-110 "
    
    >
      <Link to={`/product/${bookId}`}>
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
        <div
          className="text-3xl text-indigo-200 absolute bottom-6 left-2/2 transform -translate-x-2/2"
          onClick={() => toggleFavorite(book)}
        >
          <FaHeart
            onClick={() => toggleFavorite(book)}
            className={`${
              favorites.includes(book) ? "text-red-500" : "text-gray-400"
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
  );
}
