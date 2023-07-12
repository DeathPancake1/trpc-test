type UserType = { id: number; username?: string; email: string; pass: string; todos?: TodoType[]};
type TodoType = { id: number; title: string; finished: boolean; author?: UserType; authorId?: number}

export {UserType, TodoType};