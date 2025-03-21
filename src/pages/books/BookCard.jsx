import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";  // ✅ Import function
import "./BookCard.css";

function BookCard({ book }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(book));
  };

  return (
    <div className="book-card">
      {/* ✅ Clickable Image to Redirect to SingleBook Page */}
      <Link to={`/books/${book._id}`} className="book-image-link">
        <img
          src={getImgUrl(book.coverImage)} // ✅ Use getImgUrl to fix image path
          alt={book.title || "Book Image"}
          className="book-image"
          loading="lazy"
        />
      </Link>

      {/* ✅ Book Content */}
      <div className="book-content">
        {/* ✅ Clickable Title */}
        <Link to={`/books/${book._id}`} className="book-title">
          {book.title}
        </Link>

        {/* ✅ Display Description */}
        <p className="book-description">
          {book.description || "No description available."}
        </p>

        {/* ✅ Price with Default Values */}
        <p className="book-price">
          ${book.newPrice || "0.00"}{" "}
          {book.oldPrice && (
            <span className="original-price">${book.oldPrice}</span>
          )}
        </p>

        {/* ✅ Add to Cart Button */}
        <button type="button" className="btn-primary" onClick={handleAddToCart}>
          <FiShoppingCart className="cart-icon" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}

export default BookCard;
