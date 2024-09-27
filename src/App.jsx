
import './App.css'
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
import { useState, useEffect, useRef, useReducer, useCallback, createContext, useMemo } from 'react';


// 상태 변화 요청을 처리하는 함수
function reducer(state, action) {
  switch (action.type) {
    case 'INIT_TODOS':
      return [...action.data, ...state];
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((todo) => {
        if (todo.id === action.targetId) {
          return {
            ...todo,
            isDone: !todo.isDone
          }
        } else {
          return todo;
        }
      });
    case 'DELETE':
      return state.filter((todo) => {
        return todo.id !== action.targetId
      });

    default:
      return state;
  }
}


// 컨텐스트는 일반적으로 App 컴포넌트 외부에 선언한다.

export const TodoStateContext = createContext();     // todos : List

export const TodoDispatchContext = createContext();  // onCreate : Editor, onUpdate, onDelete : TodoItem

// console.log(TodoContext);  // Provider : Component이다.


// App Component : UI 랜더링
function App() {

  const idRef = useRef(3);

  const [todos, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    // 컴포넌트가 마운트 되었을때 
    const data = [
      {
        id: 0,
        isDone: false,
        content: 'React 공부하기',
        date: new Date().getTime()
      },
      {
        id: 1,
        isDone: false,
        content: '빨래하기',
        date: new Date().getTime()
      },
      {
        id: 2,
        isDone: false,
        content: '대청소하기',
        date: new Date().getTime()
      }
    ];

    dispatch({ type: 'INIT_TODOS', data: data });

  }, []);


  const onCreate = useCallback((content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime()
      }
    })
  }, []);


  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: 'UPDATE',
      targetId: targetId
    })
  }, []);


  const onDelete = useCallback((targetId) => {
    dispatch({
      type: 'DELETE',
      targetId: targetId
    })
  }, []);


  const memoizedDispatcher = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);


  return (
    <div className='App'>
      {/* <Exam /> */}
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatcher}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div >
  );
}

export default App;
