import React from 'react';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import { Link, useNavigate } from 'react-router-dom';
import './ManageBooks.css';

const ManageBooks = () => {
    const navigate = useNavigate();
    const { data: books, refetch } = useFetchAllBooksQuery();
    const [deleteBook] = useDeleteBookMutation();

    // Handle deleting a book
    const handleDeleteBook = async (id) => {
        if (!id || typeof id !== 'string' || !/^[0-9a-fA-F]{24}$/.test(id)) {
            alert('Invalid book ID. Please try again with a valid ID.');
            return;
        }

        try {
            await deleteBook(id).unwrap();
            alert('Book deleted successfully!');
            refetch();
        } catch (error) {
            console.error('Failed to delete book:', error);
            const errorMessage = error?.data?.message || error?.message || 'An unknown error occurred';

            if (error.status === 401 || error.status === 403) {
                alert('Session expired or access denied. Please log in again.');
                localStorage.removeItem('token'); 
                navigate('/'); 
                return;
            }

            alert(`Failed to delete book: ${errorMessage}`);
        }
    };

    return (
        <section className="manage-books-section">
            <div className="manage-books-container">
                <div className="manage-books-card">
                    <div className="manage-books-header">
                        <h3 className="header-title">All Books</h3>
                    </div>

                    <div className="table-container">
                        <table className="books-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Book Title</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books?.map((book, index) => (
                                    <tr key={book._id}>
                                        <td>{index + 1}</td>
                                        <td>{book.title}</td>
                                        <td>{book.category}</td>
                                        <td>${book.newPrice}</td>
                                        <td>
                                            <Link to={`/dashboard/edit-book/${book._id}`} className="edit-link">Edit</Link>
                                            <button onClick={() => handleDeleteBook(book._id)} className="delete-btn">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManageBooks;
