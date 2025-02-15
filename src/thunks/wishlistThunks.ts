import { createAsyncThunk } from "@reduxjs/toolkit";

import apiClient, { type ApiCLientRequestConfig } from "@/services/api-client";

import type { WishlistItem } from "@/types";

import { removeWishlistItem } from "@/slices/wishlistSlice";

const wishlistUrl = "shop/wishlist/";

const getWishlist = createAsyncThunk<
  WishlistItem[] | [],
  ApiCLientRequestConfig | void
>("getWishlist", async (config = {}, thunkAPI) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await apiClient.get(wishlistUrl, config || {});
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

const deleteWishlistItem = createAsyncThunk<
  any,
  { handleSuccess: () => void; id: string }
>("deleteWishlist", async ({ id, handleSuccess }, thunkAPI) => {
  const deleteReq = await apiClient.delete(wishlistUrl + `${id}/`);
  deleteReq.status === 204 &&
    handleSuccess() &&
    thunkAPI.dispatch(removeWishlistItem(id));
  return deleteReq.data;
});

export { getWishlist, deleteWishlistItem };
