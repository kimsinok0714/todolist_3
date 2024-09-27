
import './List.css';
import TodoItem from './TodoItem';
import { useState, useMemo, useContext } from 'react';
import { TodoStateContext } from '../App';


const List = () => {

    const todos = useContext(TodoStateContext);  // 배열

    const [search, setSearch] = useState('');

    const onChangeSearch = ((e) => {
        setSearch(e.target.value);
    });

    const getFilteredData = () => {
        if (search === '') {
            return todos;
        }

        return todos.filter((todo) => {
            return todo.content.toLowerCase().includes(search.toLowerCase());
        });
    };

    const filteredTodos = getFilteredData();
    // console.log('filteredTodos : ', filteredTodos);


    // const getAnalyzedData = () => {
    //     console.log('call getAnalyzedData');

    //     const totalCount = todos.length;
    //     const doneCount = todos.filter((todo) => {
    //         return todo.isDone;
    //     }).length;
    //     const notDoneCount = totalCount - doneCount;

    //     return {
    //         totalCount,
    //         doneCount,
    //         notDoneCount
    //     };
    // }


    // const { totalCount, doneCount, notDoneCount } = getAnalyzedData();

    /*
       React App 내부의 최적화 방법
    
       1. 컴포넌트 내부의 불 필요한 연산 방지 
       
    */

    const { totalCount, doneCount, notDoneCount } = useMemo(() => {
        console.log('call getAnalyzedData');

        const totalCount = todos.length;
        const doneCount = todos.filter((todo) => {
            return todo.isDone;
        }).length;
        const notDoneCount = totalCount - doneCount;

        return {
            totalCount,
            doneCount,
            notDoneCount
        };

    }, [todos]);


    return (
        <div className="List">
            <h4>Todo List</h4>
            <div>
                <div> totalCount : {totalCount} </div>
                <div> doneCount : {doneCount} </div>
                <div> notDoneCount : {notDoneCount} </div>
            </div>
            <input value={search} placeholder="검색어를 입력하세요" onChange={onChangeSearch} />
            <div className="todos_wrapper">
                {
                    filteredTodos.map((todo) => {
                        return <TodoItem key={todo.id} {...todo} />
                    })
                }
            </div>
        </div>
    );
}

export default List;