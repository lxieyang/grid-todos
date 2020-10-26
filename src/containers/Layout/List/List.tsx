import React, { useState, useContext } from 'react';

import TodosContext from '../../../contexts/todos-context';
import { Todo } from '../../../shared/interfaces';

import TodoItem from '../TodoItem/TodoItem';

import './List.css';

const List: React.FC = () => {
  const { todos } = useContext(TodosContext);

  const activeTodos = todos.filter(item => !item.trashed);
  const forTodayTodos = activeTodos.filter(item => item.isForToday);
  const queuedTodos = activeTodos.filter(item => !item.isForToday);
  const trashedTodos = todos.filter(item => item.trashed);

  const findTodos = (list: Todo[], important: boolean, urgent: boolean, completed?: boolean) => {
    list = list.filter(item => item.important === important && item.urgent === urgent);
    if (completed !== undefined) {
      list = list.filter(item => item.completed === completed);
    }
    return list;
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
      <div className="ListLabel ForToday">For Today</div>
      {renderTodos(findTodos(forTodayTodos, true, true, false))}
      {renderTodos(findTodos(forTodayTodos, true, false, false))}
      {renderTodos(findTodos(forTodayTodos, false, true, false))}
      {renderTodos(findTodos(forTodayTodos, false, false, false))}
      {renderTodos(findTodos(forTodayTodos, true, true, true))}
      {renderTodos(findTodos(forTodayTodos, true, false, true))}
      {renderTodos(findTodos(forTodayTodos, false, true, true))}
      {renderTodos(findTodos(forTodayTodos, false, false, true))}

      <br />
      <div className="ListLabel Queued">Queued</div>
      {renderTodos(findTodos(queuedTodos, true, true, false))}
      {renderTodos(findTodos(queuedTodos, true, false, false))}
      {renderTodos(findTodos(queuedTodos, false, true, false))}
      {renderTodos(findTodos(queuedTodos, false, false, false))}
      {renderTodos(findTodos(queuedTodos, true, true, true))}
      {renderTodos(findTodos(queuedTodos, true, false, true))}
      {renderTodos(findTodos(queuedTodos, false, true, true))}
      {renderTodos(findTodos(queuedTodos, false, false, true))}

      {activeTodos.length === 0 && <div className="NoTodos">no todos</div>}

      <br />
      <div className="ListLabel Trashed">Trashed</div>
      {renderTodos(findTodos(trashedTodos, true, true))}
      {renderTodos(findTodos(trashedTodos, true, false))}
      {renderTodos(findTodos(trashedTodos, false, true))}
      {renderTodos(findTodos(trashedTodos, false, false))}
    </div>
  );
};

export default List;
