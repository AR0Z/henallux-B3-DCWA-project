import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
	name: "theme",
	initialState: {
		mode: "dark",
	},
	reducers: {
		setMode: (state) => {
			state.mode = state.mode === "dark" ? "light" : "dark";
		},
	},
});

export const { setMode } = themeSlice.actions;

export default themeSlice.reducer;
