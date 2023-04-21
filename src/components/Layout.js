import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTasks } from "../context/taskContext";

const Layout = ({ children }) => {
  const router = useRouter();
  const { tasks } = useTasks();

  return (
    <div className="h-max bg-gray-900 text-white">
      <header className="flex items-center bg-gray-700 px-28 py-5">
        <Link href="/">
          <h1 className="font-black text-lg">Task App</h1>
        </Link>

        <span className="ml-2 text-gray-400 font-bold">
          {tasks.length} tareas
        </span>

        <div className="flex-grow text-right">
          <button
            className="bg-green-700 hover:bg-green-500 px-5 py-2 font-bold rounded-full 
          inline-flex items-center"
            onClick={() => router.push("/new")}
          >
            <AiOutlinePlus className="mr-2" />
            Add Task
          </button>
        </div>
      </header>

      <main className="h-screen px-28 py-10 flex items-center">{children}</main>
    </div>
  );
};

export default Layout;
