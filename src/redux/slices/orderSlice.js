import { createSlice } from "@reduxjs/toolkit";

import { sendOrder } from "../thunks/sendOrder";

const initialState = {
  isOpen: false,
  orderId: "",
  status: "idle",
  error: null,
  data: {
    buyerName: "",
    buyerPhone: "",
    recipientName: "",
    recipientPhone: "",
    street: "",
    house: "",
    apartment: "",
    paymentOnline: "true",
    deliveryDate: "",
    deliveryTime: "",
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
    clearOrder(state) {
      state.data = {
        buyerName: "",
        buyerPhone: "",
        recipientName: "",
        recipientPhone: "",
        street: "",
        house: "",
        apartment: "",
        paymentOnline: "true",
        deliveryDate: "",
        deliveryTime: "",
      };
    },
    updateOrderData(state, action) {
      state.data = { ...state.data, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.orderId = "";
        state.status = "loading";
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.orderId = action.payload.orderId;
        state.status = "success";
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.orderId = "";
        state.status = "error";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { openModal, closeModal, updateOrderData, clearOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
