import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./themeSlice";
import authSlice from "./authSlice";

const store = configureStore({
	reducer: {
		theme: themeSlice.reducer,
		auth: authSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

export type AppDispatch = typeof store.dispatch;
