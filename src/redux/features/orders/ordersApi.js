import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 🔹 TEMP: Hardcode the base URL to debug issues
const baseUrl = "http://localhost:5000/api/orders"; // Replace with `getBaseUrl()` if necessary

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl, // ✅ Ensure the base URL is correct
        credentials: 'include',
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/", // ✅ Correct endpoint
                method: "POST",
                body: newOrder,
                credentials: 'include',
            }),
            invalidatesTags: ['Orders'],
        }),
        getOrderByEmail: builder.query({
            query: (email) => {
                console.log("Fetching orders for email:", email); // ✅ Debugging
                return {
                    url: `/?email=${encodeURIComponent(email)}`, // ✅ Correct query parameter format
                };
            },
            providesTags: ['Orders'],
        }),
    }),
});

export const { useCreateOrderMutation, useGetOrderByEmailQuery } = ordersApi;
export default ordersApi;
