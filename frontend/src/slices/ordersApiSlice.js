import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useCreateOderMutation } = productsApiSlice;
