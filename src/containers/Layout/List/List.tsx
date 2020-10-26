import React, { useState, useContext } from 'react';

import TodosContext from '../../../contexts/todos-context';

import TodoItem from '../TodoItem/TodoItem';

import './List.css';

const List: React.FC = () => {
  const { todos } = useContext(TodosContext);

  const activeTodos = todos.filter((item) => !item.trashed);

  const trashedTodos = todos.filter((item) => item.trashed);

  return (
    <div className="List">
      <div className="ListLabel Active">Active</div>
      {activeTodos.map((item, idx) => {
        return <TodoItem key={idx} todo={item} fromAllList={true} />;
      })}
      {todos.filter((item) => !item.trashed).length === 0 && <div className="NoTodos">no todos</div>}

      <br />
      <div className="ListLabel Trashed">Trashed</div>
      {trashedTodos.map((item, idx) => {
        return <TodoItem key={idx} todo={item} fromAllList={true} />;
      })}
    </div>
  );
};

export default List;
