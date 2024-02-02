import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { priceDiscount } from "../../utils/priceDiscount";
import { rating } from "../../utils/rating";

export const productApi = createApi({
  reducerPath: "productApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),

  endpoints: (builder) => ({
    // Get All Products
    getAllProducts: builder.query({
      query: () => "/products?limit=100",
      transformResponse: (response) => {
        const data = response.products.map((product) => {
          const priceAfterDiscount = priceDiscount(
            product.price,
            product.discountPercentage
          );
          const ratingStars = rating(product.rating);
          return { ...product, priceAfterDiscount, ratingStars };
        });

        return data;
      },
    }),

    // Get Single Products
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
      transformResponse: (response) => {
        const priceAfterDiscount = priceDiscount(
          response.price,
          response.discountPercentage
        );
        const ratingStars = rating(response.rating);
        return { ...response, priceAfterDiscount, ratingStars };
      },
    }),

    // Get Category Items
    getCatItems: builder.query({
      query: () => "/products/categories",
    }),

    // Get Products By Category
    getCatProducts: builder.query({
      query: (cat) => {
        if (cat === "all") return "/products?limit=100";
        return `/products/category/${cat}`;
      },
      transformResponse: (response) => {
        const data = response.products.map((product) => {
          const priceAfterDiscount = priceDiscount(
            product.price,
            product.discountPercentage
          );
          const ratingStars = rating(product.rating);
          return { ...product, priceAfterDiscount, ratingStars };
        });

        return data;
      },
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useGetCatItemsQuery,
  useGetCatProductsQuery,
} = productApi;
