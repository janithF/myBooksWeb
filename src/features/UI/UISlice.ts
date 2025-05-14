import type { Book } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ViewMode = "grid" | "list";

interface InitialState {
  viewMode: ViewMode;
  searchTerm: string;
  filteredBooksLength: number;
  editBook: Book | null;
  selectedAuthor: string | null;
  isSidebarOpen: boolean;
}

const initialState: InitialState = {
  viewMode: "grid",
  searchTerm: "",
  filteredBooksLength: 0,
  editBook: null,
  selectedAuthor: null,
  isSidebarOpen: false,
};

const UISlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleView: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    searchBook: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    booksFiltered: (state, action: PayloadAction<number>) => {
      state.filteredBooksLength = action.payload;
    },
    editBook: (state, action: PayloadAction<Book>) => {
      state.editBook = action.payload;
    },
    selectAuthor: (state, action: PayloadAction<string | null>) => {
      state.selectedAuthor = action.payload;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSideBar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export default UISlice.reducer;
export const uiActions = UISlice.actions;
