import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../const";

export const registerCart = createAsyncThunk("cart/registerCart", async () => {
  const response = await fetch(`${API_URL}/api/cart/register`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Не удалось зарегистировать корзину");
  }

  return await response.json();
});
