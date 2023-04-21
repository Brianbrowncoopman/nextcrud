import Layout from "@/components/Layout";
import { useTasks } from "@/context/taskContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const TaskFormPage = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const { createTask, updateTask, tasks } = useTasks();
  const { push, query } = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
    //console.log(e.target.value);
    //console.log(e.target.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(task);

    if (!query.id) {
      createTask(task.title, task.description);
    } else {
      updateTask(query.id, task);
    }

    push("/");
  };

  useEffect(() => {
    if (query.id) {
      const taskFound = tasks.find((task) => task.id === query.id);
      setTask({ title: taskFound.title, description: taskFound.description });
    }
  }, []);

  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <form onSubmit={handleSubmit} className="bg-gray-700 p-10 h-2/4">
          <h1 className="text-3xl mb-7">
            {query.id ? "Update a Task" : "Create a Task"}
          </h1>
          <input
            type="text"
            name="title"
            placeholder="write a title"
            className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5"
            onChange={handleChange}
            value={task.title}
          />

          <textarea
            rows="2"
            placeholder="write a description"
            className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5"
            name="description"
            onChange={handleChange}
            value={task.description}
          ></textarea>
          <button className="bg-indigo-500 hover:bg-indigo-800 px-4 py-2 rounded-full disabled:opacity-30">
            Save
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default TaskFormPage;
