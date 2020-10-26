import { createContext } from 'react';
import { Todo } from '../shared/interfaces';

const todosContext = createContext({
  todos: [] as Todo[],
  addNewTodo: (name: string, important: boolean, urgent: boolean) => {},
  deleteTodo: (id: string) => {},
  reviveTodo: (id: string) => {},
  deleteTodoForever: (id: string) => {},
  renameTodo: (id: string, newName: string) => {},
  moveTodo: (id: string, important: boolean, urgent: boolean, isForToday?: boolean) => {},
  toggleTodoCompleteStatus: (id: string, from: boolean) => {},
  toggleTodoIsForTodayStatus: (id: string, from: boolean) => {},
});

export default todosContext;
