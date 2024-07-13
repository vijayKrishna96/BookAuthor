
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../features/cart/cartSlice";
import { MdDelete } from "react-icons/md";

// CartItem component for individual cart items
const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => (
  <div>
    <div className="cartitems-format cartitems-format-main grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] items-center gap-[75px] py-[20px] text-[#454545] text-[17px] font-medium">
      <img src={item.image} alt={item.title} className="carticon-product-icon h-[62px]" />
      <p>{item.title}</p>
      <p>{item.price}</p>
      <div className="flex gap-7">
        <button onClick={onDecrement}>-</button>
        <span>{item.quantity}</span>
        <button onClick={onIncrement}>+</button>
      </div>
      <p>${item.price * item.quantity}</p>
      <span className="w-[15px] mx-[40px] cursor-pointer text-2xl">
        <MdDelete onClick={onRemove} />
      </span>
    </div>
    <hr className="h-[3px] bg-[#e2e2e2] border-0" />
  </div>
);

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

// CartTotal component for displaying total prices
const CartTotal = ({ totalPrice }) => (
  <div className="cartitems-down flex my-[100px]">
    <div className="cartitems-total flex flex-col mr-[400px] gap-[40px]">
      <h1>Cart Totals</h1>
      <div className="w-[600px]">
        <div className="cartitems-total-item flex justify-between py-[15px]">
          <p>Subtotal</p>
          <p>${totalPrice}</p>
        </div>
        <hr className="h-[3px] bg-[#e2e2e2] border-0" />
        <div className="cartitems-total-item flex justify-between py-[15px]">
          <p>Shipping Fee</p>
          <p>Free</p>
        </div>
        <hr className="h-[3px] bg-[#e2e2e2] border-0" />
        <div className="cartitems-total-item flex justify-between py-[15px]">
          <h3>Total</h3>
          <h3>${totalPrice}</h3>
        </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-5 rounded-md cursor-pointer">
        PROCEED TO CHECKOUT
      </button>
    </div>
    <div className="cartitems-promocode flex-1 text-[16px] font-medium">
      <p className="text-[#555]">If you have a promo code, Enter it here</p>
      <div className="cartitems-promobox flex w-[504px] mt-[15px] pl-[20px] h-[58px] bg-[#eaeaea]">
        <input
          type="text"
          placeholder="promo code"
          className="border-none outline-none bg-transparent text-[16px] w-[330px] h-[50px]"
        />
        <button className="w-[170px] h-[58px] text-[16px] bg-black text-white cursor-pointer">
          Submit
        </button>
      </div>
    </div>
  </div>
);

CartTotal.propTypes = {
  totalPrice: PropTypes.number.isRequired,
};

// Main Cart component
const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleIncrement = (id) => dispatch(incrementQuantity(id));
  const handleDecrement = (id) => dispatch(decrementQuantity(id));
  const handleRemove = (id) => dispatch(removeItem(id));

  return (
    <main className="cartitems mx-[170px] my-[100px] h-[80vh]">
      <div className="cartitems-format-main grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] items-center gap-[75px] py-[20px] text-[#454545] text-[18px] font-semibold">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <section>
        {items.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            onIncrement={() => handleIncrement(item._id)}
            onDecrement={() => handleDecrement(item._id)}
            onRemove={() => handleRemove(item._id)}
          />
        ))}
      </section>
      <CartTotal totalPrice={totalPrice} />
    </main>
  );
};

export default Cart;

