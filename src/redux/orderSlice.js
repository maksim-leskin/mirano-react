import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCart, toggleCart } from "./cartSlice";

export const sendOrder = createAsyncThunk(
  "order/sendOrder",
  async (_, { getState, dispatch }) => {
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

    const response = await fetch();

    dispatch(clearOrder());
    dispatch(toggleCart());
    dispatch(fetchCart());

    return await response.json();
  },
);

const initialState = {
  isOpen: false,
  orderId: "",
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
  extraReducers: (builder) => {},
});

export const { openModal, closeModal, updateOrderData, clearOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
