import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TodoType } from "../types"
import trpc from "../trpcClient";

function Todo() {
    const { id } = useParams();
    const [todos, setTodos] = useState<TodoType[]>();

    useEffect(() => {
        getTodos()
          .then((data) => {setTodos(data)})
          .catch((error) => console.error(error));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    const getTodos = async () => {
        try{
          let authorId: number = 0;
          if(id !== undefined){
            authorId = parseInt(id);
          }
          const todoItems:TodoType[] = await trpc.todo.getTodos.query({authorId: authorId});
          return todoItems;
        }
        catch(e){
          console.log(e);
        } 
    };
    const addTodos = async () => {
        const todoTitle = document.getElementById('title') as HTMLInputElement;
        try{
            await trpc.todo.addTodo.mutate({authorId: Number(id), title: todoTitle?.value});
            getTodos()
            .then((data) => {setTodos(data)})
            .catch((error) => console.error(error));
            if (todoTitle !== undefined) {
                todoTitle.value = "";
              }
        }
        catch(e){
            console.log(e);
        }
    };

    return (
        <>
            <div>
                <input type="text" id="title" placeholder="Todo Title"></input>
                <button type="button" onClick={addTodos}>Add!</button>
            </div>
            <div>
                <ul>
                    {todos?.map(todo => (
                        <li key={todo.id}>{todo.title}</li>
                    ))}
                </ul>
            </div>
        </>
    )
  }
  
export default Todo;