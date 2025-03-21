import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api`, // ✅ FIXED: Base URL should not include "books"
    credentials: "include",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

const booksApi = createApi({
    reducerPath: "booksApi",
    baseQuery,
    tagTypes: ["Books"],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => "/books", // ✅ FIXED: Ensure correct path
            providesTags: ["Books"]
        }),
        fetchBookById: builder.query({
            query: (id) => `/books/${id}`, // ✅ FIXED: Ensure correct path
            providesTags: (result, error, id) => [{ type: "Books", id }]
        }),
        addBook: builder.mutation({
            query: (newBook) => ({
                url: "/books/create-book", // ✅ FIXED: Ensure correct path
                method: "POST",
                body: newBook,
            }),
            invalidatesTags: ["Books"]
        }),
        updateBook: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/books/edit/${id}`, // ✅ FIXED: Ensure correct path
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Books"]
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`, // ✅ FIXED: Ensure correct path
                method: "DELETE"
            }),
            invalidatesTags: ["Books"]
        })
    })
});

export const {
    useFetchAllBooksQuery,
    useFetchBookByIdQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation
} = booksApi;

export default booksApi;
