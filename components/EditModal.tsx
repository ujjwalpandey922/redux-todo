"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AiFillEdit } from "react-icons/ai";
import TodoInput from "./TodoInput";
import { TodoType } from "@/type/type";
import { useState } from "react";

export function EditModal({ list }: { list: TodoType }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AiFillEdit className="text-gray-600 cursor-pointer hover:text-gray-900 hover:scale-110 transition duration-300 ease-in-out" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#E3FEF7]">
        <TodoInput type="edit" todo={list} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
