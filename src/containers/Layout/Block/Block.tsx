import React, { useState, useContext } from 'react';

import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

import TodoItem from './TodoItem/TodoItem';

import TodosContext from '../../../contexts/todos-context';

import './Block.css';

interface Props {
  important: boolean;
  urgent: boolean;
}

const Block: React.FC<Props> = ({ important, urgent }: Props) => {
  const { todos, addNewTodo } = useContext(TodosContext);

  const [inputValue, setInputValue] = useState<string>('');

  const submitNewTodo = () => {
    let name = inputValue.trim();
    if (name.length > 0) {
      // submit
      addNewTodo(name, important, urgent);
    }
  };

  const handleAddTodo = () => {
    submitNewTodo();
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
      // e.currentTarget.blur();
    }
  };

  return (
    <div className="Block">
      <div className="TodoList">
        {todos
          .filter((item) => item.important === important && item.urgent === urgent)
          .map((item, idx) => {
            return <TodoItem key={idx} todo={item} />;
          })}
      </div>
      <div className="NewTodoContainer">
        <InputGroup size="sm">
          <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} />
          <InputGroupAddon addonType="append">
            <Button color="secondary" onClick={handleAddTodo}>
              Add
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
};

export default Block;
