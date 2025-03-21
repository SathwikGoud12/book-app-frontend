import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './AddBook.css';

const AddBook = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: '',
            description: '',
            category: '',
            trending: false,
            oldPrice: '',
            newPrice: '',
        },
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFileName, setImageFileName] = useState('');
    const [addBook, { isLoading }] = useAddBookMutation();

    const onSubmit = async (data) => {
        // Ensure prices are numbers
        const oldPrice = parseFloat(data.oldPrice);
        const newPrice = parseFloat(data.newPrice);

        // Additional validation for prices
        if (isNaN(oldPrice) || oldPrice < 0) {
            Swal.fire({
                title: "Error",
                text: "Old Price must be a valid positive number.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
            return;
        }

        if (isNaN(newPrice) || newPrice < 0) {
            Swal.fire({
                title: "Error",
                text: "New Price must be a valid positive number.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
            return;
        }

        if (!imageFile) {
            Swal.fire({
                title: "Error",
                text: "Please select a cover image.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
            return;
        }

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('trending', data.trending.toString()); // Convert boolean to string for FormData
        formData.append('oldPrice', oldPrice.toString());
        formData.append('newPrice', newPrice.toString());
        formData.append('coverImage', imageFile);

        // Debug: Log the FormData contents
        console.log('FormData contents:', [...formData]);

        try {
            await addBook(formData).unwrap();
            Swal.fire({
                title: "Book Added",
                text: "Your book has been uploaded successfully!",
                icon: "success",
                confirmButtonColor: "#3085d6",
            });

            // Reset form & clear image state
            reset();
            setImageFileName('');
            setImageFile(null);
            setImagePreview(null);
        } catch (error) {
            console.error('Failed to add book:', error);
            // Improved error handling
            let errorMessage = 'An unknown error occurred';
            if (error?.data?.message) {
                errorMessage = error.data.message;
            } else if (error?.data?.error) {
                errorMessage = error.data.error;
            } else if (error?.message) {
                errorMessage = error.message;
            }

            if (error.status === 403) {
                alert('Invalid credentials. Please log in again.');
                localStorage.removeItem('token');
                navigate('/');
                return;
            }

            Swal.fire({
                title: "Error",
                text: `Failed to add book: ${errorMessage}`,
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileName(file.name);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Cleanup: Release memory when imagePreview changes
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <div className="add-book-container">
            <h2 className="add-book-title">Add New Book</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="add-book-form">
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    register={register}
                    validation={{ required: "Title is required" }}
                    error={errors.title}
                />
                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter book description"
                    type="textarea"
                    register={register}
                    validation={{ required: "Description is required" }}
                    error={errors.description}
                />
                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: '', label: 'Choose A Category' },
                        { value: 'business', label: 'Business' },
                        { value: 'technology', label: 'Technology' },
                        { value: 'fiction', label: 'Fiction' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'adventure', label: 'Adventure' },
                    ]}
                    register={register}
                    validation={{
                        required: "Category is required",
                        validate: (value) => value !== '' || "Please select a valid category",
                    }}
                    error={errors.category}
                />
                <div className="form-group">
                    <label>Trending</label>
                    <input
                        type="checkbox"
                        {...register("trending")}
                    />
                </div>
                <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="Old Price"
                    register={register}
                    validation={{
                        required: "Old Price is required",
                        min: { value: 0, message: "Old Price must be a positive number" },
                    }}
                    error={errors.oldPrice}
                />
                <InputField
                    label="New Price"
                    name="newPrice"
                    type="number"
                    placeholder="New Price"
                    register={register}
                    validation={{
                        required: "New Price is required",
                        min: { value: 0, message: "New Price must be a positive number" },
                    }}
                    error={errors.newPrice}
                />
                
                <div className="file-input-container">
                    <label className="file-input-label">Cover Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input"
                    />
                    {imageFileName && <p className="file-input-selected">Selected: {imageFileName}</p>}
                    {imagePreview && <img src={imagePreview} alt="Cover Preview" className="image-preview" />}
                </div>
                
                <button type="submit" className="submit-btn" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Book"}
                </button>
            </form>
        </div>
    );
};

export default AddBook;