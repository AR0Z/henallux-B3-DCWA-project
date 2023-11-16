import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./themeSlice";
import { apiSlice } from "./apiSlice";
import authReducer from "./authSlice";

const store = configureStore({
	reducer: {
		theme: themeSlice.reducer,
		auth: authReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

export default store;
