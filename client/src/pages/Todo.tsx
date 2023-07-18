import { useParams } from "react-router-dom";
import { SetStateAction, useEffect, useState } from "react";
import { TodoType } from "../types"
import trpc from "../trpcClient";

function Todo() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
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
        try{
            await trpc.todo.addTodo.mutate({authorId: Number(id), title: title});
            getTodos()
            .then((data) => {setTodos(data)})
            .catch((error) => console.error(error));
            setTitle('');
        }
        catch(e){
            console.log(e);
        }
    };

    const handleChangeTitle = (event: { target: { value: SetStateAction<string>; }; }) =>{
        setTitle(event.target.value);
    }

    return (
        <>
            <div>
                <input type="text" id="title" placeholder="Todo Title" value={title} onChange={handleChangeTitle}></input>
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