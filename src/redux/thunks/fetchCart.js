import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../const";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  (_, { rejectWithValue }) =>
    fetch(`${API_URL}/api/cart`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не удалось получить данные корзины");
        }

        return response.json();
      })
      .catch((error) => {
        return rejectWithValue(error.message);
      }),
);
