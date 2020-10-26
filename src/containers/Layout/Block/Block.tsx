import React, { useState, useContext } from 'react';
import { useDrop } from 'react-dnd';
import ordinal from 'ordinal';

import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

import TodoItem from '../TodoItem/TodoItem';

import TodosContext from '../../../contexts/todos-context';
import { colors } from '../../../shared/constants';
import { ItemTypes, DropItem } from '../ItemTypes';

// @ts-ignore
import α from 'color-alpha';

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
    }
  };

  const getBackgroundColor = (): string | undefined => {
    let bgColor =
      important && urgent
        ? colors.SecondQuadrant
        : !important && urgent
        ? colors.FirstQuadrant
        : important && !urgent
        ? colors.ThirdQuadrant
        : !important && !urgent
        ? colors.FourthQuadrant
        : undefined;
    return α(bgColor, 0.4);
  };

  const getBackgroundText = (): string => {
    if (important && urgent) {
      return 'first'; // ordinal(1);
    } else if (important && !urgent) {
      return ordinal(2); // 'second'
    } else if (!important && urgent) {
      return 'last'; // ordinal(3);
    } else {
      return 'avoid';
    }
  };

  return (
    <div
      ref={drop}
      className="Block"
      style={{
        backgroundColor: getBackgroundColor(),
        borderColor: isActive ? 'black' : undefined,
      }}
    >
      <div className="TodoList">
        {todos
          .filter((item) => item.important === important && item.urgent === urgent && !item.trashed)
          .map((item, idx) => {
            return <TodoItem key={idx} todo={item} fromAllList={false} />;
          })}
      </div>
      <div className="NewTodoContainer">
        <div className="BlockBgTextContainer">
          do <span className="BlockGbTextStrong">{getBackgroundText()}</span>
        </div>

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
