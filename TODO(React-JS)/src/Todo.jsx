import { useState } from 'react';
import { InputTodo } from './components/InputTodo';
import { IncompleteTodos } from './components/IncompleteTodos';
import { CompleteTodos } from './components/CompleteTodos';
import './styles.css';

export const Todo = () => {
  const [todoText, setTodoText] = useState('');
  const [incompleteTodos, setIncompelteTodos] = useState([]);
  const [completeTodos, setCompelteTodos] = useState([]);
  const onChaneTodoText = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === '') return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompelteTodos(newTodos);
    setTodoText('');
  };
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompelteTodos(newTodos);
  };
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompelteTodos(newIncompleteTodos);
    setCompelteTodos(newCompleteTodos);
  };
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompelteTodos(newIncompleteTodos);
    setCompelteTodos(newCompleteTodos);
  };

  isMaxIncompeleteTodos = incompleteTodos.length >= 5;
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChaneTodoText}
        onClick={onClickAdd}
        disabled={isMaxIncompeleteTodos}
      />
      {isMaxIncompeleteTodos && (
        <p style={{ color: 'red' }}>
          登録できるタスクは5個までです。消化してください。
        </p>
      )}

      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
