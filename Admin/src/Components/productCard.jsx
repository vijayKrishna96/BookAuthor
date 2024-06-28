import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({book}) {
  return (
    <article>
      <Link to={`/books/${book._id}`}>
        <img className='w-full aspect-[3/4] object-fill' src={book.image} />
      </Link>
      <span>{book.title}</span>
      <h3 className='font-bold'></h3>
      <span>&#x20B9;{book.price}</span>
      {/* <button
        onClick={() => deleteProduct(product._id, onDelete)}
        className='p-2 ml-2 w-150 bg-red-300'
      >
        Delete Product
      </button> */}
    </article>
  );
}