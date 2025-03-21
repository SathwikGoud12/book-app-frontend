import React, { useState } from "react";
import BookCard from "../books/BookCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import required modules
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

import "./TopSellers.css"; // Import CSS file

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

  const { data: books = [], isLoading, error } = useFetchAllBooksQuery();

  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter((book) => book.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="top-sellers-container">
      <h2 className="title">Top Sellers</h2>

      {/* Category Filtering */}
      <div className="filter-container">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          name="category"
          id="category"
          className="filter-dropdown"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Show loading or error message */}
      {isLoading && <p className="loading-text">Loading books...</p>}
      {error && <p className="error-text">Error fetching books: {error.message}</p>}

      {/* Display Books using Swiper */}
      {!isLoading && !error && filteredBooks.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {filteredBooks.map((book, index) => (
            <SwiperSlide key={book.id || index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        !isLoading && !error && <p className="no-books-text">No books found</p>
      )}
    </div>
  );
};

export default TopSellers;
