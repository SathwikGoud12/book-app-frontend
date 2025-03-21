import React, { useEffect } from 'react';
import InputField from '../addBook/InputField';
import SelectField from '../addBook/SelectField';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../../redux/features/books/booksApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import './UpdateBook.css';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (bookData) {
      Object.keys(bookData).forEach((key) => {
        setValue(key, bookData[key]);
      });
    }
  }, [bookData, setValue]);

  const onSubmit = async (data) => {
    const updatedBookData = {
      id,
      ...data,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
    };

    try {
      await updateBook(updatedBookData).unwrap();
      Swal.fire({
        title: "Success",
        text: "Book updated successfully!",
        icon: "success",
      });
      refetch();
      navigate('/dashboard/manage-books');
    } catch (error) {
      const errorMessage = error?.data?.message || "An unknown error occurred";
      Swal.fire({
        title: "Error",
        text: `Failed to update book: ${errorMessage}`,
        icon: "error",
      });
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div className="error-message">Error fetching book data</div>;

  return (
    <div className="update-book-container">
      <h2>Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="update-book-form">
        <InputField label="Title" name="title" register={register} />
        <InputField label="Description" name="description" type="textarea" register={register} />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
          ]}
          register={register}
        />

        <InputField label="Old Price" name="oldPrice" type="number" register={register} />
        <InputField label="New Price" name="newPrice" type="number" register={register} />
        <InputField label="Cover Image URL" name="coverImage" register={register} />

        <button type="submit" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Book'}
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
