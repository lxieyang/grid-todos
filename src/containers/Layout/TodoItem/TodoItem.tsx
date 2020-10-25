import React, { useState, useEffect, useContext } from 'react';
import { useDrag } from 'react-dnd';

import { ItemTypes, DropItem } from '../ItemTypes';
import { Todo } from '../../../shared/interfaces';

import TodosContext from '../../../contexts/todos-context';

import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

import './TodoItem.css';

interface Props {
  todo: Todo;
  fromAllList: boolean;
}

const TodoItem: React.FC<Props> = ({ todo, fromAllList }: Props) => {
  const { renameTodo, deleteTodo, toggleTodoCompleteStatus, deleteTodoForever } = useContext(TodosContext);

  let dropItem: DropItem = {
    id: todo.id,
    type: ItemTypes.TODO,
  };

  const [{ opacity }, drag] = useDrag({
    item: dropItem,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  const [todoName, setTodoName] = useState<string>(todo.name);

  useEffect(() => {
    setTodoName(todo.name);
  }, [todo.name]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value);
  };

  const submitNewName = () => {
    let name = todoName.trim();
    if (name !== todo.name) {
      renameTodo(todo.id, name);
    }
  };

  const handleBlur = () => {
    submitNewName();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitNewName();
      e.currentTarget.blur();
    }
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleComplete = () => {
    toggleTodoCompleteStatus(todo.id, todo.completed);
  };

  const handleDeleteForever = () => {
    deleteTodoForever(todo.id);
  };

  return (
    <>
      <ContextMenuTrigger id={`${todo.id}-${fromAllList}`}>
        <input
          ref={drag}
          className={['TodoItem', todo.completed ? 'Completed' : null].join(' ')}
          onChange={handleInput}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          value={todoName}
        />
      </ContextMenuTrigger>

      <ContextMenu id={`${todo.id}-${fromAllList}`}>
        <MenuItem onClick={() => handleComplete()}>{todo.completed ? 'Un-complete' : 'Mark as completed'}</MenuItem>
        <MenuItem divider />
        <MenuItem onClick={() => handleDelete()} className="delete">
          Trash
        </MenuItem>
        {fromAllList && todo.trashed && (
          <>
            <MenuItem divider />
            <MenuItem onClick={() => handleDeleteForever()} className="delete">
              Delete Forever
            </MenuItem>
          </>
        )}
      </ContextMenu>
    </>
  );
};

export default TodoItem;
