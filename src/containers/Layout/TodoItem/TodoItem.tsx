import React, { useState, useEffect, useContext } from 'react';
import { useDrag } from 'react-dnd';
import Textarea from 'react-autosize-textarea';

import { ItemTypes, DropItem } from '../ItemTypes';
import { Todo } from '../../../shared/interfaces';
import { colors } from '../../../shared/constants';

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

  const [{ isDragging }, drag, preview] = useDrag({
    item: dropItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [todoName, setTodoName] = useState<string>(todo.name);

  useEffect(() => {
    setTodoName(todo.name);
  }, [todo.name]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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

  const { important, urgent } = todo;

  return (
    <>
      <ContextMenuTrigger id={`${todo.id}-${fromAllList}`} disable={isDragging} holdToDisplay={-1}>
        <div
          className={['TodoItem', todo.completed ? 'Completed' : null].join(' ')}
          ref={preview}
          style={{ opacity: isDragging ? 0.5 : 1 }}
        >
          <Textarea
            onChange={(e) => handleInput(e as React.ChangeEvent<HTMLTextAreaElement>)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            value={todoName}
            rows={1}
            maxRows={5}
            style={{ resize: 'none', cursor: isDragging ? 'move' : '' }}
          />
          {/* {fromAllList && ( */}
          <div className="QuadrantIndicator" ref={drag}>
            <div className="QuadrantGroup">
              <div
                className="Quadrant Second"
                style={{ backgroundColor: important && urgent ? colors.SecondQuadrant : undefined }}
              ></div>
              <div
                className="Quadrant First"
                style={{ backgroundColor: !important && urgent ? colors.FirstQuadrant : undefined }}
              ></div>
            </div>
            <div className="QuadrantGroup">
              <div
                className="Quadrant Third"
                style={{ backgroundColor: important && !urgent ? colors.ThirdQuadrant : undefined }}
              ></div>
              <div
                className="Quadrant Fourth"
                style={{ backgroundColor: !important && !urgent ? colors.FourthQuadrant : undefined }}
              ></div>
            </div>
          </div>
          {/* })} */}
        </div>
      </ContextMenuTrigger>

      <ContextMenu id={`${todo.id}-${fromAllList}`} hideOnLeave={true}>
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
