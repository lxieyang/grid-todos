import React, { useState, useContext } from 'react';

import TodosContext from '../../../contexts/todos-context';
import { Todo } from '../../../shared/interfaces';

import TodoItem from '../TodoItem/TodoItem';

import './List.css';

const List: React.FC = () => {
  const { todos } = useContext(TodosContext);

  const activeTodos = todos.filter((item) => !item.trashed);
  const trashedTodos = todos.filter((item) => item.trashed);

  const findTodos = (list: Todo[], important: boolean, urgent: boolean) => {
    return list.filter((item) => item.important === important && item.urgent === urgent);
  };

  const renderTodos = (list: Todo[]): React.ReactNode => {
    return (
      <>
        {list.map((item, idx) => {
          return <TodoItem key={idx} todo={item} fromAllList={true} />;
        })}
      </>
    );
  };

  return (
    <div className="List">
      <div className="ListLabel Active">Active</div>
      {renderTodos(findTodos(activeTodos, true, true))}
      {renderTodos(findTodos(activeTodos, false, true))}
      {renderTodos(findTodos(activeTodos, true, false))}
      {renderTodos(findTodos(activeTodos, false, false))}

      {todos.filter((item) => !item.trashed).length === 0 && <div className="NoTodos">no todos</div>}

      <br />
      <div className="ListLabel Trashed">Trashed</div>
      {renderTodos(findTodos(trashedTodos, true, true))}
      {renderTodos(findTodos(trashedTodos, false, true))}
      {renderTodos(findTodos(trashedTodos, true, false))}
      {renderTodos(findTodos(trashedTodos, false, false))}
    </div>
  );
};

export default List;
