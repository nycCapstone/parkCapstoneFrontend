import { createSlice } from "@reduxjs/toolkit";

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState: {
    data: null,
    loading: false,
    error: null,
    filters: {
      sortByPrice: false,
    },
    location: null,
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.data = action.payload.results;
      state.location = action.payload.location;
      state.loading = false;
      state.error = null;
    },
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
      state.location = null;
    },
    setSortByPrice: (state, action) => {
      state.filters.sortByPrice = action.payload;
    },
  },
});

export const {
  setSearchResults,
  searchResultsLoading,
  searchResultsSuccess,
  searchResultsError,
  searchResultsMutate,
  resetSearchState,
  setSortByPrice,
} = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
