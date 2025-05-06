    import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

    export const firebaseApi = createApi({
        reducerPath: "firebaseApi",
        baseQuery: fetchBaseQuery({ 
            baseUrl: "https://burger-6e37c-default-rtdb.firebaseio.com/"
        }),

        endpoints: (builder) => ({
            getUsers: builder.query({
                query: (uid) => `users/${uid}.json`
            }),

            addUser: builder.mutation({
                query: ({ uid, newUser }) => ({
                    url: `users/${uid}.json`,
                    method: 'PUT',
                    body: newUser
                })
            }),

            updateUser: builder.mutation({
                query: ({ uid, updates }) => ({
                    url: `users/${uid}.json`,
                    method: 'PATCH',
                    body: updates
                })
            })
        })

    })

    export const { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation } = firebaseApi;