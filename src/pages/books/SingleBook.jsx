import React, { useEffect } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import "./SingleBook.css";  

const SingleBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Redirect if ID is invalid
    useEffect(() => {
        if (!id) {
            console.error("Invalid book ID detected:", id);
            navigate("/not-found"); // Redirect to a 404 page if ID is missing
        }
    }, [id, navigate]);

    // Fetch book data
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id, {
        skip: !id, // Skip the query if ID is missing
    });

    if (isLoading) return <div className="loading">Loading...</div>;
    if (isError || !book) return <div className="error-message">❌ Book not found.</div>;

    return (
        <div className="single-book-container">  {/* Added Unique Class */}
            {/* Book Title */}
            <h1 className="book-title">{book?.title || "Untitled Book"}</h1>

            {/* Book Content (Image + Details) */}
            <div className="book-content">
                {/* Book Image */}
                <div className="book-image">
                    <img
                        src={book?.coverImage || "/default-book.jpg"}
                        alt={book?.title || "Book Cover"}
                        loading="lazy"
                    />
                </div>

                {/* Book Details */}
                <div className="book-details">
                    <p><strong>Author:</strong> {book?.author || 'Unknown'}</p>
                    <p><strong>Published:</strong> {book?.createdAt ? new Date(book.createdAt).toLocaleDateString() : "Unknown"}</p>
                    <p><strong>Category:</strong> {book?.category || "Uncategorized"}</p>
                    <p><strong>Description:</strong> {book?.description || "No description available."}</p>
                </div>
            </div>

            {/* Add to Cart Button */}
            <button className="add-to-cart-btn" onClick={() => dispatch(addToCart(book))}>
                <FiShoppingCart />
                <span>Add to Cart</span>
            </button>
        </div>
    );
};

export default SingleBook;
