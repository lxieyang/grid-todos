import React, { useState, useEffect } from 'react';
import { sortBy, reverse } from 'lodash';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import NavBar from './containers/NavBar/NavBar';
import Layout from './containers/Layout/Layout';
import Auth from './containers/Auth/Auth';

import { Todo } from './shared/interfaces';
import TodosContext from './contexts/todos-context';
import appRoutes from './shared/appRoutes';

import firebase, {
  auth,
  getCurrentUser,
  db,
  DB_COLLECTIONS,
  createNewTodo,
  deleteTodoById,
  reviveTodoById,
  deleteTodoForeverById,
  renameTodoById,
  moveTodoById,
  toggleTodoCompleteStatusById,
  toggleTodoIsForTodayStatusById,
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
        history.push(appRoutes.home);
        if (unsubscribeTodos) unsubscribeTodos();
        setUpTodosListener();
      } else {
        if (unsubscribeTodos) unsubscribeTodos();
        setTodos([]);
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
      .onSnapshot(querySnapshot => {
        let list: Todo[] = [];
        querySnapshot.forEach(doc => {
          list.push({ ...doc.data() } as Todo);
        });
        list = sortBy(list, ['createdAt', 'updatedAt']);
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

  const reviveTodo = (id: string) => {
    reviveTodoById(id);

    // let list = [...todos].map((item) => {
    //   if (item.id === id) {
    //     item.trashed = false;
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

  const moveTodo = (id: string, important: boolean, urgent: boolean, isForToday?: boolean) => {
    moveTodoById(id, important, urgent, isForToday);

    // let list = [...todos].map((item) => {
    //   if (item.id === id) {
    //     item.important = important;
    //     item.urgent = urgent;
    //   }
    //   return item;
    // });
    // setTodos(list);
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

  const toggleTodoIsForTodayStatus = (id: string, from: boolean) => {
    toggleTodoIsForTodayStatusById(id, from);
  };

  return (
    <>
      <TodosContext.Provider
        value={{
          todos,
          addNewTodo,
          deleteTodo,
          reviveTodo,
          deleteTodoForever,
          renameTodo,
          moveTodo,
          toggleTodoCompleteStatus,
          toggleTodoIsForTodayStatus,
        }}
      >
        <NavBar email={user === undefined ? undefined : user ? user.email : null} />

        <div style={{ marginTop: 56 }}>
          <Switch>
            <Route path={appRoutes.auth} exact>
              <Auth user={user} />
            </Route>
            {user ? (
              <Route path={appRoutes.home}>
                <Layout />
              </Route>
            ) : (
              <Redirect to={appRoutes.auth} />
            )}
          </Switch>
        </div>
      </TodosContext.Provider>
    </>
  );
};

export default App;
