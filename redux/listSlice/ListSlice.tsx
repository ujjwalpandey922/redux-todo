import { TodoType } from "@/type/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Function to load todos from local storage
const loadTodosFromLocalStorage = (): TodoType[] => {
  try {
    const todosJson = localStorage.getItem("todos");
    if (todosJson) {
      return JSON.parse(todosJson);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error loading todos from local storage:", error);
    return [];
  }
};

// Define the initial state using the function to load todos from local storage
const initialState: TodoType[] = loadTodosFromLocalStorage();

// Create a slice for the todo list with necessary reducers
const listSlice = createSlice({
  name: "lists", // Name of the slice
  initialState, // Initial state of the slice
  reducers: {
    // Reducer to add a new todo
    addTodo: (
      state,
      action: PayloadAction<{ id: string; title: string; description: string }>
    ) => {
      const newTodo: TodoType = {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        isCompleted: false,
      };
      state.push(newTodo);
    },

    // Reducer to edit an existing todo
    editTodo: (
      state,
      action: PayloadAction<{
        id?: string;
        title: string;
        description: string;
        isCompleted?: boolean;
      }>
    ) => {
      return state.map((list) => {
        if (list.id === action.payload.id) {
          return {
            ...list,
            title: action.payload.title,
            description: action.payload.description,
            isCompleted: list.isCompleted,
          };
        }
        return list;
      });
    },

    // Reducer to remove a todo by ID
    removeTodo: (state, action: PayloadAction<string>) => {
      return state.filter((singleTodo) => singleTodo.id !== action.payload);
    },

    // Reducer to toggle the completion status of a todo by ID
    checkedTodo: (state, action: PayloadAction<string>) => {
      return state.map((list) => {
        if (list.id === action.payload) {
          return {
            ...list,
            isCompleted: !list.isCompleted,
          };
        }
        return list;
      });
    },
  },
});

// Export the action creators
export const { addTodo, editTodo, removeTodo, checkedTodo } = listSlice.actions;

// Export the reducer as default
export default listSlice.reducer;
