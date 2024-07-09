import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseCircleSharp } from "react-icons/io5";
import { addItemToCart } from "../../features/cart/cartSlice";
import { removeItems } from "../../features/wishList/wishList";

export default function WishList(props) {

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };


  const items = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  console.log(items);

  return (
    <main className="container max-w-full mx-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          My Wishlist <span className="font-normal"></span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map((item) => (
            <div key={item.id} className="border p-4 text-center relative">
              <div className="relative inline-block mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-72"
                />
                <IoCloseCircleSharp className="absolute top-[-10px] right-[-30px] text-3xl text-red-500 cursor-pointer" 
                onClick={()=>{
                  dispatch(removeItems(item._id))
                }}
                />
              </div>
              <div className="item-info mb-4">
                <p className="text-lg font-semibold">{truncateText(item.title, 16)}</p>
                <p className="text-xl font-bold text-black">
                  {item.price}{" "}
                  <span className="line-through text-gray-500">
                    {item.originalPrice}
                  </span>
                </p>
              </div>
              <div>
                {item.discount === "OUT OF STOCK" ? (
                  <button className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">
                    SHOW SIMILAR
                  </button>
                ) : (
                  <button className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                  onClick={() => {
                    dispatch(addItemToCart(item));
                  }}
                  >
                    MOVE TO CART
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
