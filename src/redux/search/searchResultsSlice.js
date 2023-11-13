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
      state.data = null;
    },
    searchResultsSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    searchResultsError: {
      reducer: (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.payload;
      },
      prepare: (text) => {
        if (typeof text === "string") {
          return { payload: text };
        } else {
          return { payload: "Api Down" };
        }
      },
    },
    searchResultsMutate: (state, action) => {
      state.data.params = action.payload;
    },
    resetSearchState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    }
  },
});

export const {
  searchResultsLoading,
  searchResultsSuccess,
  searchResultsError,
  searchResultsMutate,
  resetSearchState
} = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
