import prisma  from "../../express";
import { TodoType } from "../../types";

export const getTodosQuery = async ({
    authorId
}: {
    authorId: number
}): Promise<TodoType[]> =>{
    const todos = await prisma.todo.findMany({
        where: {
            authorId: authorId
        }
    });
    return todos;
}

export const addTodoMut = async ({
    authorId,
    title    
}: {
    authorId: number,
    title: string
}) => {
    await prisma.todo.create({
        data: {
        title: title,
        author: { connect: { id: authorId } },
        finished: false
        }
    });
}