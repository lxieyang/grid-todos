import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import NavBar from './containers/NavBar/NavBar';
import Layout from './containers/Layout/Layout';
import Auth from './containers/Auth/Auth';

import { Todo } from './shared/interfaces';
import TodosContext from './contexts/todos-context';

import firebase, {
  auth,
  getCurrentUser,
  db,
  DB_COLLECTIONS,
  createNewTodo,
  deleteTodoById,
  deleteTodoForeverById,
  renameTodoById,
  toggleTodoCompleteStatusById,
} from './firebase';

import './App.css';

const App: React.FC = () => {
  const history = useHistory();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<firebase.User | null | undefined>(undefined);

  let unsubscribeTodos: any = undefined;

  useEffect(() => {
    auth.onAuthStateChanged((user: firebase.User | null) => {
      setUser(user);
      if (user) {
        history.push('/');
        if (unsubscribeTodos) unsubscribeTodos();
        setUpTodosListener();
      } else {
        if (unsubscribeTodos) unsubscribeTodos();
      }
    });

    return () => {
      if (unsubscribeTodos) unsubscribeTodos();
    };
  }, []);

  const setUpTodosListener = () => {
    unsubscribeTodos = db
      .collection(DB_COLLECTIONS.TODOS)
      .where('authorId', '==', getCurrentUser()?.uid)
      .onSnapshot((querySnapshot) => {
        let list: Todo[] = [];
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data() } as Todo);
        });
        setTodos(list);
      });
  };

  // useEffect(() => {
  //   const todosInStorage = localStorage.getItem('todos');
  //   if (!todosInStorage) {
  //     localStorage.setItem('todos', JSON.stringify([]));
  //   } else {
  //     let todoList = JSON.parse(todosInStorage) as Todo[];
  //     setTodos(todoList);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify(todos));
  // }, [todos]);

  const addNewTodo = (name: string, important: boolean, urgent: boolean) => {
    createNewTodo(name, important, urgent);

    // let todo: Todo = {
    //   id: uuid(),
    //   authorId: getCurrentUser()?.uid,
    //   name,
    //   important,
    //   urgent,
    //   completed: false,
    //   trashed: false,
    //   date: new Date().getTime() as number,
    // };
    // let list = [...todos];
    // list.push(todo);
    // setTodos(list);
  };

  const deleteTodo = (id: string) => {
    deleteTodoById(id);

    // let list = [...todos].map((item) => {
    //   if (item.id === id) {
    //     item.trashed = true;
    //   }
    //   return item;
    // });
    // setTodos(list);
  };

  const deleteTodoForever = (id: string) => {
    deleteTodoForeverById(id);

    // let list = [...todos].filter((item) => item.id !== id);
    // setTodos(list);
  };

  const renameTodo = (id: string, newName: string) => {
    renameTodoById(id, newName);

    // let list = [...todos].map((item) => {
    //   if (item.id === id) {
    //     item.name = newName;
    //   }
    //   return item;
    // });
    // setTodos(list);
  };

  const moveTodo = (id: string, important: boolean, urgent: boolean) => {
    let list = [...todos].map((item) => {
      if (item.id === id) {
        item.important = important;
        item.urgent = urgent;
      }
      return item;
    });
    setTodos(list);
  };

  const toggleTodoCompleteStatus = (id: string, from: boolean) => {
    toggleTodoCompleteStatusById(id, from);

    // let list = [...todos].map((item) => {
    //   if (item.id === id) {
    //     item.completed = !from;
    //   }
    //   return item;
    // });
    // setTodos(list);
  };

  return (
    <>
      <TodosContext.Provider
        value={{
          todos,
          addNewTodo,
          deleteTodo,
          deleteTodoForever,
          renameTodo,
          moveTodo,
          toggleTodoCompleteStatus,
        }}
      >
        <NavBar email={user ? user.email : null} />

        <div style={{ marginTop: 56 }}>
          <Switch>
            <Route path="/auth">
              <Auth user={user} />
            </Route>
            {user ? (
              <>
                <Route path="/">
                  <Layout />
                </Route>
              </>
            ) : (
              <Redirect to="/auth" />
            )}
          </Switch>
        </div>
      </TodosContext.Provider>
    </>
  );
};

export default App;
