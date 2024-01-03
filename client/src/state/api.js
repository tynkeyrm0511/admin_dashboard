import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl:process.env.REACT_APP_BASE_URL}),
    reducerPath:"adminApi",
    tagTypes:["User", "Products", "Customers", "Transactions","Sales","Dashboard"],

    endpoints: (build) => ({
        getUser: build.query({
          query: (id) => `general/user/${id}`,
          providesTags: ["User"],
        }),
        getProducts: build.query({
          query: () => "client/products",
          providesTags: ["Products"],
        }),
        getCustomers:build.query({
          query: () => "client/customers",
          providesTags: ["Customers"]
        }),
        getTransactions: build.query({
          query: ({ page, pageSize, sort, search }) => ({
            url: "client/transactions",
            method: "GET",
            params: { page, pageSize, sort, search },
          }),
          providesTags: ["Transactions"],
        }),
        getSales: build.query({
          query:() => "sales/sales",
          providesTags: ["Sales"],
        }),
        getDashboard: build.query({
          query: () => "general/dashboard",
          providesTags: ["Dashboard"],
        }),
    })
})

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetSalesQuery,
  useGetDashboardQuery,
} = api