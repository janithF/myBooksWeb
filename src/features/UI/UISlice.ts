import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ViewMode = "grid" | "list";

interface InitialState {
  viewMode: ViewMode;
}

const initialState: InitialState = {
  viewMode: "grid",
};

const UISlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleView: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
  },
});

export default UISlice.reducer;
export const uiActions = UISlice.actions;
