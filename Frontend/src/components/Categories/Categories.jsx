
import axios from 'axios';
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FadeIn, fadeInRotate } from '../../variants';


export async function loader() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/category/`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data!", error);
    return [];
  }
}

export default function Category() {
  const categories = useLoaderData();
  console.log(categories);

  // Define specific directions for each category
  const categoryDirections = {
    'Fantasy': 'right',
    'Drama': 'right',
    'Science Fiction': 'left',
    'Thriller': 'left',
  };

  return (
    <main className="container mx-auto max-w-full">
      <h1 className="text-4xl m-5 p-3">Categories</h1>
      <div className="grid grid-cols-2 gap-10 p-10">
        {categories.map((category, index) => {
          // Use the direction from the mapping or default to 'up'
          const direction = categoryDirections[category.categoryName] || 'up';

          return (
            <motion.div
              className="relative w-[50rem] h-[22rem]"
              key={category._id}
              variants={FadeIn(direction, 0.2 * (index + 1))}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/50 rounded-2xl"></div>
              <img
                className="rounded-2xl w-full h-full object-cover"
                src={category.image}
                alt={category.categoryName}
              />
              <Link to={`/category/${category._id}`}>
                <h3 className="absolute inset-0 flex items-center justify-center text-white text-5xl">
                  {category.categoryName}
                </h3>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}