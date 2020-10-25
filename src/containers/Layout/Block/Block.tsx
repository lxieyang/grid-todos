import React, { useState, useContext } from 'react';
import { useDrop } from 'react-dnd';

import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

import TodoItem from '../TodoItem/TodoItem';

import TodosContext from '../../../contexts/todos-context';
import { ItemTypes, DropItem } from '../ItemTypes';

import './Block.css';

interface Props {
  important: boolean;
  urgent: boolean;
}

const Block: React.FC<Props> = ({ important, urgent }: Props) => {
  const { todos, addNewTodo, moveTodo } = useContext(TodosContext);

  const handleDrop = (item: DropItem) => {
    moveTodo(item.id, important, urgent);
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.TODO],
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

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
    <div
      ref={drop}
      className={[
        'Block',
        important && urgent ? 'SecondQuadrant' : null,
        !important && urgent ? 'FirstQuadrant' : null,
        important && !urgent ? 'ThirdQuadrant' : null,
        !important && !urgent ? 'FourthQuadrant' : null,
      ].join(' ')}
    >
      <div className="TodoList">
        {todos
          .filter((item) => item.important === important && item.urgent === urgent && !item.trashed)
          .map((item, idx) => {
            return <TodoItem key={idx} todo={item} fromAllList={false} />;
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
