import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import NavBar from './containers/NavBar/NavBar';
import Layout from './containers/Layout/Layout';

import { Todo } from './shared/interfaces';
import TodosContext from './contexts/todos-context';

import './App.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

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
          renameTodo,
          moveTodo,
          toggleTodoCompleteStatus,
        }}
      >
        <NavBar />
        <div style={{ marginTop: 56 }}>
          <Layout />
        </div>
      </TodosContext.Provider>
    </>
  );
};

export default App;
