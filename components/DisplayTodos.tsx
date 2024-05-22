"use client"; // Indicates that this code should run on the client side

import { TodoType } from "@/type/type"; // Import the TodoType interface
import React, { useEffect, useState } from "react"; // Import React and hooks
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { AiFillDelete } from "react-icons/ai"; // Import delete icon from react-icons
import { checkedTodo, removeTodo } from "@/redux/listSlice/ListSlice"; // Import Redux actions
import { EditModal } from "./EditModal"; // Import EditModal component

// Define props for TodoItem component
interface TodoItemProps {
  list: TodoType;
  handleDelete: (id: string) => void;
  handleCheckboxChange: (id: string) => void;
}

// TodoItem component for rendering individual todo items
const TodoItem: React.FC<TodoItemProps> = React.memo(
  ({ list, handleDelete, handleCheckboxChange }) => (
    <div
      key={list.id}
      className="w-full sm:w-[30%] bg-[#E3FEF7] p-4 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105"
    >
      <div className="flex justify-between items-center">
        <h1
          className={`${
            list.isCompleted ? "line-through" : ""
          } text-lg font-semibold `}
        >
          {list.title}
        </h1>
        <div className="flex gap-2">
          {/* Edit modal for editing todo item */}
          <EditModal list={list} />
          {/* Delete icon for removing todo item */}
          <AiFillDelete
            className="text-red-600 cursor-pointer hover:text-red-900 hover:scale-110 transition duration-300 ease-in-out"
            onClick={() => handleDelete(list.id)}
          />
        </div>
      </div>
      {/* Description with optional line-through if completed */}
      <p
        className={`${
          list.isCompleted ? "line-through" : ""
        } text-lg font-semibold text-gray-600 `}
      >
        {list.description}
      </p>
      <div className="flex items-center mt-4">
        {/* Checkbox for marking todo as complete */}
        <input
          type="checkbox"
          id={`complete-${list.id}`}
          className="mr-2"
          checked={list.isCompleted}
          onChange={() => handleCheckboxChange(list.id)}
        />
        <label
          htmlFor={`complete-${list.id}`}
          className="text-sm text-gray-700"
        >
          Mark as complete
        </label>
      </div>
    </div>
  )
);

// DisplayTodos component for rendering the list of todo items
const DisplayTodos = () => {
  // State to track if the component is running on the client
  const [isClient, setisClient] = useState(false);

  // useEffect to set isClient to true on component mount
  useEffect(() => {
    setisClient(true);
  }, []);

  // Get the list of todos from Redux store
  const lists = useSelector((state: { lists: TodoType[] }) => state.lists);
  const dispatch = useDispatch();

  // Handler for checkbox change to toggle todo completion
  const handleCheckboxChange = (id: string) => {
    dispatch(checkedTodo(id));
  };

  // Handler for delete button to remove todo
  const handleDelete = (id: string) => {
    dispatch(removeTodo(id));
  };

  // Render null if not on client to avoid hydration errors
  if (!isClient) return null;

  return (
    <div className="w-full flex flex-col gap-4 mb-8 mt-4 justify-evenly flex-wrap">
      {/* Display heading */}
      <h1 className="text-2xl font-bold text-white">All Your Todos...</h1>
      {lists.length > 0 ? (
        // Render the list of todos if there are any
        <div className="flex justify-evenly flex-wrap max-sm:p-4 gap-4 max-sm:flex-col">
          {lists.map((list) => (
            <TodoItem
              key={list.id}
              list={list}
              handleDelete={handleDelete}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </div>
      ) : (
        // Display message if there are no todos
        <h1 className="text-2xl text-center text-white">
          Create your first Todo List.
        </h1>
      )}
    </div>
  );
};

export default DisplayTodos;
