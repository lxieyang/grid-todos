import React, { useState, useContext } from 'react';

import TodosContext from '../../../contexts/todos-context';

import TodoItem from '../TodoItem/TodoItem';

import './List.css';

const List: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="List">
      {todos
        .filter((item) => !item.trashed)
        .map((item, idx) => {
          return <TodoItem key={idx} todo={item} fromAllList={true} />;
        })}
      {todos.filter((item) => !item.trashed).length === 0 && <div className="NoTodos">no todos</div>}
    </div>
  );
};

export default List;
