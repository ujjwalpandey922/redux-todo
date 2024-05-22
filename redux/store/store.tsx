"use client";
import { configureStore } from "@reduxjs/toolkit";
import ListSlice from "../listSlice/ListSlice";
export const store = configureStore({
  reducer: {
    lists: ListSlice,
  },
});
// Save todos to local storage after each update
store.subscribe(() => {
  const todos = store.getState().lists;
  localStorage.setItem("todos", JSON.stringify(todos));
});
