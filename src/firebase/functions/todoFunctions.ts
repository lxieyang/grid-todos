import { db, auth } from '../init';
import { getCurrentUser } from '../index';
import { DB_COLLECTIONS } from '../../shared/constants';
import { collection, doc, setDoc, updateDoc, deleteDoc, deleteField, writeBatch } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { Todo } from '../../shared/interfaces';

export const todosRef = collection(db, DB_COLLECTIONS.TODOS);

const getCurrentTime = () => {
  return new Date().getTime();
};

export const getTodoById = (id: string) => {
  return doc(todosRef, id);
};

export const createNewTodo = (name: string, important: boolean, urgent: boolean) => {
  const now: number = getCurrentTime();
  let todo: Todo = {
    id: uuid(),
    authorId: getCurrentUser()?.uid,
    name,
    important,
    urgent,
    completed: false,
    trashed: false,
    createdAt: now,
    updatedAt: now,
    isForToday: true,
  };

  const todoRef = doc(todosRef, todo.id);
  setDoc(todoRef, todo);
};

export const deleteTodoById = (id: string) => {
  updateDoc(getTodoById(id), {
    trashed: true,
  });
};

export const reviveTodoById = (id: string) => {
  updateDoc(getTodoById(id), {
    trashed: false,
  });
};

export const deleteTodoForeverById = (id: string) => {
  deleteDoc(getTodoById(id));
};

export const clearDeletedTodos = (ids: string[]) => {
  const batch = writeBatch(db);
  ids.forEach(id => {
    batch.delete(getTodoById(id));
  });
  batch.commit();
};

export const renameTodoById = (id: string, name: string) => {
  updateDoc(getTodoById(id), {
    name,
    updatedAt: getCurrentTime(),
  });
};

export const moveTodoById = (id: string, important: boolean, urgent: boolean, isForToday?: boolean) => {
  updateDoc(getTodoById(id), {
    important,
    urgent,
    trashed: false,
    isForToday: isForToday !== undefined ? isForToday : false,
  });
};

export const toggleTodoCompleteStatusById = (id: string, from: boolean) => {
  if (from === false) {
    // mark as completed
    updateDoc(getTodoById(id), {
      completed: true,
      completedAt: getCurrentTime(),
    });
  } else {
    // mark as not completed
    updateDoc(getTodoById(id), {
      completed: false,
      completedAt: deleteField(),
    });
  }
};

export const toggleTodoIsForTodayStatusById = (id: string, from: boolean) => {
  updateDoc(getTodoById(id), {
    isForToday: !from,
  });
};
