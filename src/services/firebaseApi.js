// services/firebaseApi.js
import { getDatabase, ref, get, set, update, child, push } from "firebase/database";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const firebaseApi = createApi({
  reducerPath: "firebaseApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getUser: builder.query({
      queryFn: async (uid) => {
        try {
          const dbRef = ref(getDatabase());
          const snapshot = await get(child(dbRef, `users/${uid}`));
          if (snapshot.exists()) {
            return { data: snapshot.val() };
          } else {
            return { error: { status: 404, message: "User not found" } };
          }
        } catch (err) {
          return { error: { status: 500, message: err.message } };
        }
      },
    }),

    addUser: builder.mutation({
      queryFn: async ({ uid, userData }) => {
        try {
          const db = getDatabase();
          await set(ref(db, `users/${uid}`), userData);
          return { data: userData };
        } catch (err) {
          return { error: { status: 500, message: err.message } };
        }
      },
    }),

    updateUser: builder.mutation({
      queryFn: async ({ uid, updates }) => {
        try {
          const db = getDatabase();
          await update(ref(db, `users/${uid}`), updates);
          return { data: updates };
        } catch (err) {
          return { error: { status: 500, message: err.message } };
        }
      },
    }),

    addUserCard: builder.mutation({
      queryFn: async ({ uid, cardNumber }) => {
        try {
          const db = getDatabase();
          const userRef = ref(db, `users/${uid}/cards`);
          const snapshot = await get(userRef);
          const existingCards = snapshot.exists() ? snapshot.val() : [];
    
          const updatedCards = Array.isArray(existingCards)
            ? [...existingCards, cardNumber]
            : [cardNumber]; // fallback if not an array
    
          await update(ref(db, `users/${uid}`), {
            cards: updatedCards,
          });
    
          return { data: updatedCards };
        } catch (err) {
          return { error: { status: 500, message: err.message } };
        }
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useAddUserCardMutation,
} = firebaseApi;
