import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "",
});

export const authStore = createApi({
  reducerPath: "authStore",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    exchangeToken: builder.mutation({
      query: (body) => {
        const { code, grant_type, client_id, client_secret, redirect_uri  } = body;
        return {
          // url: `${process.env.REACT_APP_TOKEN_ENDPOINT}?code=${code}&grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}`,
          url: `${process.env.REACT_APP_TOKEN_SFDCURL+"oauth2/token"}?code=${code}&grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}`,
          method: "POST",        
          body,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        };
      } ,
    }),
    logout: builder.mutation({
      query: () => {
        return {
          // url: `${process.env.REACT_APP_LOGOUT_ENDPOINT}`,
          url: `${process.env.REACT_APP_TOKEN_SFDCURL+"auth/idp/oidc/logout"}`,
          method: "POST",    
          credentials: "include"  
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useExchangeTokenMutation, useLogoutMutation } = authStore;