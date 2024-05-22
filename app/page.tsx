import DisplayTodos from "@/components/DisplayTodos";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";

export default function Home() {
  return (
    <main className="flex min-h-screen container bg-hero  bg-center bg-cover flex-col items-center justify-start gap-8 px-2">
      <Header />
      <TodoInput type="add" />
      <DisplayTodos />
    </main>
  );
}
