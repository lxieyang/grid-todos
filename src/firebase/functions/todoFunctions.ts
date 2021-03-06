import firebase, { DB_COLLECTIONS, db, getCurrentUser } from '../index';
import { v4 as uuid } from 'uuid';
import { Todo } from '../../shared/interfaces';

const getCurrentTime = () => {
  return new Date().getTime();
};

export const getTodoById = (id: string) => {
  return db.collection(DB_COLLECTIONS.TODOS).doc(id);
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

  const todoRef = db.collection(DB_COLLECTIONS.TODOS).doc(todo.id);
  todoRef.set(todo);
};

export const deleteTodoById = (id: string) => {
  getTodoById(id).update({
    trashed: true,
  });
};

export const reviveTodoById = (id: string) => {
  getTodoById(id).update({
    trashed: false,
  });
};

export const deleteTodoForeverById = (id: string) => {
  getTodoById(id).delete();
};

export const renameTodoById = (id: string, name: string) => {
  getTodoById(id).update({
    name,
    updatedAt: getCurrentTime(),
  });
};

export const moveTodoById = (id: string, important: boolean, urgent: boolean, isForToday?: boolean) => {
  getTodoById(id).update({
    important,
    urgent,
    trashed: false,
    isForToday: isForToday !== undefined ? isForToday : false,
  });
};

export const toggleTodoCompleteStatusById = (id: string, from: boolean) => {
  if (from === false) {
    // mark as completed
    getTodoById(id).update({
      completed: true,
      completedAt: getCurrentTime(),
    });
  } else {
    // mark as not completed
    getTodoById(id).update({
      completed: false,
      completedAt: firebase.firestore.FieldValue.delete(),
    });
  }
};

export const toggleTodoIsForTodayStatusById = (id: string, from: boolean) => {
  getTodoById(id).update({
    isForToday: !from,
  });
};
