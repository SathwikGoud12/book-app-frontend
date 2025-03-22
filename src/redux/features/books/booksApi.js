import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api`, // Ensure correct base URL
    credentials: "include",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        headers.set("Content-Type", "application/json"); // Ensure correct content type
        return headers;
    }
});

const booksApi = createApi({
    reducerPath: "booksApi",
    baseQuery,
    tagTypes: ["Books"],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => "/books",
            providesTags: ["Books"]
        }),
        fetchBookById: builder.query({
            query: (id) => `/books/${id}`,
            providesTags: (result, error, id) =>
                result ? [{ type: "Books", id }] : [] // Fix: Prevents errors if result is undefined
        }),
        addBook: builder.mutation({
            query: (newBook) => ({
                url: "/books",
                method: "POST",
                body: newBook,
            }),
            invalidatesTags: ["Books"]
        }),
        updateBook: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/books/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Books"]
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
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
