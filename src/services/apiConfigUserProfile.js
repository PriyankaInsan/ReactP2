import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { refreshAccessToken } from "../features/login/AuthSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_PATH,
  prepareHeaders: (headers, {getState}) => {
    const idToken = getState().Auth?.idToken;
    if(idToken){
      headers.set("Authorization", `Bearer ${idToken}`);
    }else{ console.log("Prepare Header : Id Token is missing."); }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(refreshAccessToken());
    // retry the initial query
    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

export const postApiUser = createApi({
  reducerPath: "postApiUser",      
  baseQuery: baseQueryWithReauth,  
  endpoints: (builder) => ({
    isNewUser: builder.query({
      query: (data) => {  
        return {
          url: `/userprofile/api/v1/FirstLogin?emailID=${data.email}&loginFlag=${sessionStorage.getItem("userLogedIn")?sessionStorage.getItem("userLogedIn"):true}`,
          method: "GET"
        };
      },
    }),
    UserprofileGetAllData: builder.query({
      query: (urlname) => {    
        return {
          url: "/userprofile/api/v1/"+urlname,
          method: "GET"
        };
      },
    }),
    userprofile_getDataById: builder.query({
      query: (id) => {
        return {
          url: `/userprofile/api/v1/posts/${id}`,
          method: "GET"
        };
      },
    }),
    userprofile_getDataBylimit: builder.query({
      query: (num) => {
        return {
          url: `/userprofile/api/v1/posts?_limit=${num}}`,
          method: "GET"
        };
      },
    }),
    userprofile_deleteData: builder.mutation({
      query: (data) => {
        const { Method , ...newData } = data;
        return {
          url: `/userprofile/api/v1/${Method}`,
          method: "DELETE",
          body: newData,
        };
      },
    }),
    userprofile_deleteDataRecord: builder.mutation({
      query: (data) => {
        const { Method , ...newData } = data;
        return {
          url: `/userprofile/api/v1/${Method}`,
          method: "PUT",
          body: newData,
        };
      },
    }),
    userprofile_createData: builder.mutation({
      query: (newData) => {
        const { Method , ...data} = newData;
        return {
          url: `/userprofile/api/v1/${Method}`,
          method: "POST",        
          body:data,
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        };
      } ,
    }),
    userprofile_updateData: builder.mutation({
      query: (updateData) => {
        const { Method, ...data } = updateData;
        return {
          url: `/userprofile/api/v1/${Method}`,
          method: "PUT",
          body: data,
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        };
      },
    }),
    saveUserData: builder.mutation({
      query: (data) => {    
        return {
          url: "/userprofile/api/v1/UserData",
          method: "POST",
          body:data,
          headers:{
            "Content-type": "application/json; charset=UTF-8"
          }
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyIsNewUserQuery, useSaveUserDataMutation, useLazyUserprofileGetAllDataQuery} = postApiUser;



