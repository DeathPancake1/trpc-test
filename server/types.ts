type User = { id: number; username?: string; email: string; pass: string; todos?: Todo[]};
type Todo = { id: number; title: string; finished: boolean; author?: User; authorId?: number}

export {User, Todo};