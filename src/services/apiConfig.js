import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* Prepare Query Headers for sending ID Token as Bearer Token in all API calls.*/
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_PATH,
  prepareHeaders: (headers, { getState }) => {
    const idToken = getState().Auth?.idToken;
    if (idToken) {
      headers.set("Authorization", `Bearer ${idToken}`);
    } else {
      console.log("Prepare Header : Id Token is missing.");
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions); //API call
  if (result.error && result.error.status === 401) {
    // error
    api.dispatch(refreshAccessToken()); //new access token we are fetching
    // retry the initial query
    result = await baseQuery(args, api, extraOptions); // calling failed API again
  }
  return result;
};

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllData: builder.query({
      query: (urlname) => {
        return {
          url: urlname,
          method: "GET",
        };
      },
    }),
    getDataById: builder.query({
      query: (id) => {
        return {
          url: `posts/${id}`,
          method: "GET",
        };
      },
    }),
    getDataBylimit: builder.query({
      query: (num) => {
        return {
          url: `posts?_limit=${num}}`,
          method: "GET",
        };
      },
    }),
    deleteData: builder.mutation({
      query: (data) => {
        const { Method, ...newData } = data;
        return {
          url: `/${Method}`,
          method: "DELETE",
          body: newData,
        };
      },
    }),
    deleteDataRecord: builder.mutation({
      query: (data) => {
        const { Method, ...newData } = data;
        return {
          url: `/${Method}`,
          method: "PUT",
          body: newData,
        };
      },
    }),
    createData: builder.mutation({
      query: (newData) => {
        const { Method, ...data } = newData;
        return {
          url: `/${Method}`,
          method: "POST",
          body: data,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
    }),
    updateData: builder.mutation({
      query: (updateData) => {
        const { Method, ...data } = updateData;
        return {
          url: `/${Method}`,
          method: "PUT",
          body: data,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
    }),
    calcEngineData: builder.mutation({
      query: (body) => {
        const { Method, ...data } = body;
        return {
          url: `${Method}`,
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLazyGetAllDataQuery,
  useGetDataByIdQuery,
  useGetDataBylimitQuery,
  useCreateDataMutation,
  useCalcEngineDataMutation,
  useDeleteDataRecordMutation,
  useDeleteDataMutation,
  useUpdateDataMutation,
} = postApi;
