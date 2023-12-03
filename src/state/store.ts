import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./themeSlice";
import authSlice from "./authSlice";

const store = configureStore({
	reducer: {
		theme: themeSlice.reducer,
		auth: authSlice.reducer,
	},
});

export default store;
