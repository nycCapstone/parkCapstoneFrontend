import { createSlice } from "@reduxjs/toolkit";

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    searchResultsLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    searchResultsSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    searchResultsError: (state, action) => {
      state.data = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  searchResultsLoading,
  searchResultsSuccess,
  searchResultsError,
} = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
