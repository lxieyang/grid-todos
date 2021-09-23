import React, { useState, useContext } from 'react';

import TodosContext from '../../../contexts/todos-context';
import { Todo } from '../../../shared/interfaces';

import TodoItem from '../TodoItem/TodoItem';

import { AiOutlineClear as ClearIcon } from 'react-icons/ai';

import './List.css';

const List: React.FC = () => {
  const { todos, clearDeletedTodos } = useContext(TodosContext);

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

  const renderTodosBlockInList = (list: Todo[]): React.ReactNode => {
    return (
      <>
        {renderTodos(findTodos(list, true, true, false))}
        {renderTodos(findTodos(list, true, false, false))}
        {renderTodos(findTodos(list, false, true, false))}
        {renderTodos(findTodos(list, false, false, false))}
        {renderTodos(findTodos(list, true, true, true))}
        {renderTodos(findTodos(list, true, false, true))}
        {renderTodos(findTodos(list, false, true, true))}
        {renderTodos(findTodos(list, false, false, true))}
      </>
    );
  };

  return (
    <div className="List">
      <div className="ListLabel ForToday">For Today</div>
      {renderTodosBlockInList(forTodayTodos)}
      {forTodayTodos.length === 0 && <div className="NoTodos">no todos</div>}
      <br />

      <div className="ListLabel Queued">Queued</div>
      {renderTodosBlockInList(queuedTodos)}
      {queuedTodos.length === 0 && <div className="NoTodos">no todos</div>}
      <br />

      <div className="ListLabel Trashed">
        <span style={{ flex: 1 }}>Trashed</span>
        <ClearIcon
          style={{
            cursor: trashedTodos.length > 0 ? 'pointer' : 'not-allowed',
            opacity: trashedTodos.length === 0 ? '0.2' : undefined,
          }}
          onClick={() => {
            if (trashedTodos.length > 0 && window.confirm('Are you sure?')) {
              clearDeletedTodos(trashedTodos.map(t => t.id));
            }
          }}
        />
      </div>
      {renderTodosBlockInList(trashedTodos)}
    </div>
  );
};

export default List;
