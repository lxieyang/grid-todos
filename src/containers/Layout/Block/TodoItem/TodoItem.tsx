import React, { useState, useEffect, useContext } from 'react';
import { Todo } from '../../../../shared/interfaces';

import TodosContext from '../../../../contexts/todos-context';

import './TodoItem.css';

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }: Props) => {
  const { renameTodo } = useContext(TodosContext);

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

  return (
    <input className="TodoItem" onChange={handleInput} onBlur={handleBlur} onKeyDown={handleKeyDown} value={todoName} />
  );
};

export default TodoItem;
