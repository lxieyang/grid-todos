import React, { useState, useContext } from 'react';

import TodosContext from '../../../contexts/todos-context';

import TodoItem from '../TodoItem/TodoItem';

import './List.css';

const List: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="List">
      {todos.map((item, idx) => {
        return <TodoItem key={idx} todo={item} />;
      })}
      {todos.length === 0 && <div className="NoTodos">no todos</div>}
    </div>
  );
};

export default List;
