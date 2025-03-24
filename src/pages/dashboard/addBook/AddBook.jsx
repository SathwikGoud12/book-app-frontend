import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useForm } from "react-hook-form";
import { useAddBookMutation } from "../../../redux/features/books/booksApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./AddBook.css";

const AddBook = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [addBook, { isLoading }] = useAddBookMutation();

    const onSubmit = async (data) => {
        const oldPrice = parseFloat(data.oldPrice);
        const newPrice = parseFloat(data.newPrice);

        if (!imageFile) {
            Swal.fire({ title: "Error", text: "Please select a cover image.", icon: "error" });
            return;
        }

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("trending", data.trending ? "true" : "false");
        formData.append("oldPrice", oldPrice);
        formData.append("newPrice", newPrice);
        formData.append("coverImage", imageFile);

        try {
            await addBook(formData).unwrap();
            Swal.fire({ title: "Success", text: "Book added successfully!", icon: "success" });

            reset();
            setImageFile(null);
            setImagePreview(null);
        } catch (error) {
            console.error("Failed to add book:", error);
            Swal.fire({ title: "Error", text: "Failed to add book. Please try again.", icon: "error" });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

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
                <InputField label="Title" name="title" register={register} validation={{ required: "Title is required" }} error={errors.title} />
                <InputField label="Description" name="description" type="textarea" register={register} validation={{ required: "Description is required" }} error={errors.description} />
                
                <SelectField label="Category" name="category" options={[{ value: "", label: "Choose A Category" }, { value: "business", label: "Business" }, { value: "technology", label: "Technology" }, { value: "fiction", label: "Fiction" }]} register={register} validation={{ required: "Category is required" }} error={errors.category} />

                <InputField label="Old Price" name="oldPrice" type="number" register={register} validation={{ required: "Old Price is required", min: 0 }} error={errors.oldPrice} />
                <InputField label="New Price" name="newPrice" type="number" register={register} validation={{ required: "New Price is required", min: 0 }} error={errors.newPrice} />

                <input type="file" accept="image/*" onChange={handleFileChange} />
                {imagePreview && <img src={imagePreview} alt="Cover Preview" className="image-preview" />}

                <button type="submit" disabled={isLoading}>{isLoading ? "Adding..." : "Add Book"}</button>
            </form>
        </div>
    );
};

export default AddBook;
