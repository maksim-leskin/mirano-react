import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../const";
import { clearOrder } from "../slices/orderSlice";
import { toggleCart } from "../slices/cartSlice";
import { fetchCart } from "./fetchCart";

export const sendOrder = createAsyncThunk(
  "order/sendOrder",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const {
        order: {
          data: {
            buyerName,
            buyerPhone,
            recipientName,
            recipientPhone,
            street,
            house,
            apartment,
            paymentOnline,
            deliveryDate,
            deliveryTime,
          },
        },
      } = getState();
      const orderData = {
        buyer: {
          name: buyerName,
          phone: buyerPhone,
        },
        recipient: {
          name: recipientName,
          phone: recipientPhone,
        },
        address: `${street}, ${house}, ${apartment}`,
        paymentOnline,
        deliveryDate,
        deliveryTime,
      };

      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Не удалось оформить заказ!");
      }

      const data = await response.json();

      dispatch(clearOrder());
      dispatch(toggleCart());
      dispatch(fetchCart());

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
