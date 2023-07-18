import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TodoType } from "../types";
import trpc from "../trpcClient";
import { useQuery } from "react-query";

function Todo() {
  const { id } = useParams();
  const [title, setTitle] = useState("");

  const { data: todoItems, isLoading ,error, refetch } = useQuery<TodoType[]>(
    "todos",
    getTodos
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function getTodos() {
    try {
      let authorId: number = 0;
      if (id !== undefined) {
        authorId = parseInt(id);
      }
      return await trpc.todo.getTodos.query({
        authorId: authorId,
      });
    } catch (e) {
      console.log(e);
      throw new Error("Failed to fetch todos");
    }
  }

  const addTodos = async () => {
    try {
      await trpc.todo.addTodo.mutate({ authorId: Number(id), title: title });
      refetch();
      setTitle("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeTitle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitle(event.target.value);
  };

  if (error) {
    return <div>Error</div>;
  }
  if(isLoading){
    return <div>Loading</div>;
  }

  return (
    <>
      <div>
        <input
          type="text"
          id="title"
          placeholder="Todo Title"
          value={title}
          onChange={handleChangeTitle}
        ></input>
        <button type="button" onClick={addTodos}>
          Add!
        </button>
      </div>
      <div>
        <ul>
          {todoItems?.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Todo;
