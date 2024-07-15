import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import goodsReducer from "./slices/goodsSlice";
import filtersReduce from "./slices/filtersSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    goods: goodsReducer,
    filters: filtersReduce,
  },
});

export default store;
