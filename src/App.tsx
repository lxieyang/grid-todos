import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import NavBar from './containers/NavBar/NavBar';
import Layout from './containers/Layout/Layout';
import Auth from './containers/Auth/Auth';

import { Todo } from './shared/interfaces';
import TodosContext from './contexts/todos-context';

import firebase, { auth } from './firebase';

import './App.css';

const App: React.FC = () => {
  const history = useHistory();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<firebase.User | null | undefined>(undefined);

  useEffect(() => {
    console.log(history);
    auth.onAuthStateChanged((user: firebase.User | null) => {
      console.log(user);
      setUser(user);
      if (user) {
        history.push('/');
      }
    });
  }, []);

  useEffect(() => {
    const todosInStorage = localStorage.getItem('todos');
    if (!todosInStorage) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoList = JSON.parse(todosInStorage) as Todo[];
      setTodos(todoList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addNewTodo = (name: string, important: boolean, urgent: boolean) => {
    let todo: Todo = {
      id: uuid(),
      name,
      important,
      urgent,
      completed: false,
      trashed: false,
    };

    let list = [...todos];
    list.push(todo);
    setTodos(list);
  };

  const deleteTodo = (id: string) => {
    let list = [...todos].map((item) => {
      if (item.id === id) {
        item.trashed = true;
      }
      return item;
    });
    setTodos(list);
  };

  const deleteTodoForever = (id: string) => {
    let list = [...todos].filter((item) => item.id !== id);
    setTodos(list);
  };

  const renameTodo = (id: string, newName: string) => {
    let list = [...todos].map((item) => {
      if (item.id === id) {
        item.name = newName;
      }
      return item;
    });
    setTodos(list);
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

  const toggleTodoCompleteStatus = (id: string) => {
    let list = [...todos].map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setTodos(list);
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
