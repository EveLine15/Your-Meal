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

    getMenu: builder.query({
      queryFn: async () => {
        try {
          const dbRef = ref(getDatabase());
          const snapshot = await get(child(dbRef, "menu"));
          const menuData = snapshot.val();
          if (snapshot.exists()) {
            return { data: menuData };
          } else {
            console.warn("No menu data found");
            return { error: { status: 404, message: "Menu not found" } };
          }
        } catch (err) {
          console.error("Error loading menu:", err);
          return { error: { status: 500, message: err.message } };
        }
      }
    }),

    addOrder: builder.mutation({
      queryFn: async ({ uid, orders }) => {
        console.log("order in rb", orders);
        try {
          if (!uid) throw new Error("Missing user ID");

          const db = getDatabase();
          const ordersRef = ref(db, `users/${uid}/orders`);

          const snapshot = await get(ordersRef);
          const existingOrders = snapshot.exists() ? snapshot.val() : [];

          const ordersArray = Array.isArray(existingOrders)
            ? existingOrders
            : Object.values(existingOrders);

          const newOrder = {
            ...orders,
            id: Date.now().toString(),
          };

          ordersArray.push(newOrder);

          await set(ordersRef, ordersArray);

          return { data: newOrder };
        } catch (err) {
          return { error: { status: 500, message: err.message } };
        }
      },
    }),

    getOrder: builder.query({
      queryFn: async (uid) => {
        try {
          const dbRef = ref(getDatabase());
          const snapshot = await get(child(dbRef, `users/${uid}/orders`));
          if (snapshot.exists()) {
            return { data: snapshot.val() };
          } else {
            return { data: [] }
          }
        } catch (err) {
          return { error: { status: 500, message: err.message } };
        }
      },
    }),

    getCart: builder.query({
      queryFn: async (uid) => {
        try {
          const dbRef = ref(getDatabase());
          const snapshot = await get(child(dbRef, `users/${uid}/cart`));
          if (snapshot.exists()) {
            return { data: snapshot.val() };
          } else {
            return { data: [] }
          }
        } catch (err) {
          return { error: { status: 500, message: err.message } };
        }
      },
    }),

    updateCart: builder.mutation({
        async queryFn({ uid, cart }) {
            try {
                const db = getDatabase();
                await set(ref(db, `users/${uid}/cart`), cart);
                return { data: { success: true } };
            } catch (error) {
                return { error };
            }
        },
    }),

    getMenuLength: builder.query({
      queryFn: async (category) => {
        try {
          const dbRef = ref(getDatabase());
          const snapshot = await get(child(dbRef, `menu/${category}/items`));
          if (snapshot.exists()) {
            const menuData = snapshot.val();
            const menuArray = Object.values(menuData);
            return { data: menuArray.length };
          } else {
            console.warn("No menu data found");
            return { error: { status: 404, message: "Menu not found" } };
          }
        } catch (err) {
          console.error("Error loading menu:", err);
          return { error: { status: 500, message: err.message } };
        }
      }
    }),

    addProduct: builder.mutation({
      queryFn: async ({ category, data, number }) => {
        try {
          const db = getDatabase();

          const itemRef = ref(db, `menu/${category}/items/${number}`);

          const cleanData = {
            ...data,
            compos: data.compos.split(',').map(item => item.trim())
          };

          await set(itemRef, cleanData);

          return { data: cleanData };
        } catch (err) {
          return { error: { status: 500, message: err.message } };
        }
      },
    })

  }),

});

export const {
  useGetUserQuery,
  useGetMenuQuery,
  useLazyGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useLazyGetMenuQuery,
  useAddOrderMutation,
  useLazyGetOrderQuery,
  useLazyGetCartQuery,
  useUpdateCartMutation,
  useAddProductMutation,
  useGetMenuLengthQuery
} = firebaseApi;
