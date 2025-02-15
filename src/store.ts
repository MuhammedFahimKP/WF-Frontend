import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";

// slices
import authSlice from "./slices/authenticationSlice";
import alertSlice from "./slices/alertSlice";
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";
import adminProductSearchSlice from "./slices/admin/productSearchSlice";
import adminProductVariationSlice from "./slices/admin/producVarationSlice";
import currentProductSlice from "./slices/currentProductSlice";
import checkoutSlice from "./slices/checkoutSlice";
import orderSlice from "./slices/orderSlice";

const rootReducer = combineReducers({
  auth: authSlice,
});

type RootReducer = ReturnType<typeof rootReducer>;

const persistEncrypter = encryptTransform(
  {
    secretKey: import.meta.env.VITE_CRYPTO_KEY,
    onError: () => null,
  },
  {
    whitelist: ["auth"],
  }
);

const persistedReducer = persistReducer<RootReducer>(
  {
    key: "root",
    version: 1,
    storage: storage,
    whitelist: ["auth"],
    transforms: [persistEncrypter],
  },
  rootReducer
);

export const store = configureStore({
  reducer: {
    persistedReducer,
    alertSlice,
    cartSlice,
    wishlistSlice,
    currentProductSlice,
    adminProductSearchSlice,
    adminProductVariationSlice,
    checkoutSlice,
    orderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export const { getState, dispatch } = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispact = typeof store.dispatch;
