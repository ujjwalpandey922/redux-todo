"use client"; // Indicates that this code should run on the client side

import React, { SetStateAction, useState } from "react"; // Import React and necessary hooks
import { Button } from "@/components/ui/button"; // Import custom Button component
import { v4 as uuidv4 } from "uuid"; // Import UUID generation function
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Import custom Card components
import { Input } from "@/components/ui/input"; // Import custom Input component
import { Label } from "@/components/ui/label"; // Import custom Label component
import { Textarea } from "@/components/ui/textarea"; // Import custom Textarea component
import { useDispatch } from "react-redux"; // Import useDispatch hook from Redux
import { addTodo, editTodo } from "@/redux/listSlice/ListSlice"; // Import Redux actions
import { TodoType } from "@/type/type"; // Import TodoType interface

// TodoInput component for adding or editing todos
const TodoInput = ({
  type, // Type of operation: 'add' or 'edit'
  todo, // Optional existing todo item for editing
  setOpen, // Optional function to close modal or input form
}: {
  type: string;
  todo?: TodoType;
  setOpen?: React.Dispatch<SetStateAction<boolean>>;
}) => {
  // Local state for title and description
  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");

  // Get the dispatch function from Redux
  const dispatch = useDispatch();

  // Handler for adding or editing a note
  const handleAddNote = () => {
    if (!title || !description) return; // Do nothing if title or description is empty

    if (type === "edit") {
      // If editing, dispatch the editTodo action with updated todo data
      dispatch(editTodo({ ...todo, title, description }));
      setOpen?.(false); // Close the input form if setOpen function is provided
    } else {
      // If adding a new todo, generate a unique ID and dispatch the addTodo action
      const id = uuidv4();
      dispatch(
        addTodo({
          id,
          title,
          description,
        })
      );
    }

    // Clear the input fields after adding or editing the todo
    setTitle("");
    setDescription("");
  };

  return (
    <div className="w-full ">
      <Card className="w-full max-w-[400px] mx-auto backdrop-blur-sm shadow-[0,0,22px] bg-[#fff2]">
        <CardHeader>
          <CardTitle>
            {type === "edit" ? "Edit Todo List" : "Add Todo List"}
          </CardTitle>
          <CardDescription className="font-semibold text-black">
            {type === "edit"
              ? "Edit your Todo List in one-click."
              : "Add your Todo List in one-click."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Title of your Note"
                  value={title}
                  className="block w-full p-3 rounded mb-4 bg-transparent placeholder:text-black"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  placeholder="Add description of your Note ........"
                  id="description"
                  value={description}
                  className="block w-full p-3 rounded mb-4 bg-transparent placeholder:text-black"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="w-full">
          <Button className="w-full" onClick={handleAddNote}>
            {type === "edit" ? "Edit Note" : "Add Note"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TodoInput;
