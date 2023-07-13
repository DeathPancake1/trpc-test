import { publicProcedure, router } from "../../trpc";
import { TodoType } from "../../types";
import { addTodoMut, getTodosQuery } from "./todo.service";
import { todoValidation } from "./todo.validation";

const todoRouter = router({
    getTodos: publicProcedure
      .input(todoValidation.getTodos)
      .query( async (opts) => {
        const {input} = opts;
        try{
            const todos = await getTodosQuery(input);
            return todos; 
        }
        catch(e){
            console.log(e);
        }
        const arr: TodoType[] = [];
        return arr
        
      }),
    addTodo: publicProcedure
      .input(todoValidation.addTodo)
      .mutation( async (opts) => {
        const {input} = opts;
        try{
            const todo = await addTodoMut(input);
            return true;
        }
        catch(e){
            console.log(e);
        }
      }),
  });

  export default todoRouter;