import './TodoItem.css';

import { memo, useContext } from 'react';
import { TodoContext } from '../App';


const TodoItem = ({ id, isDone, date, content }) => {

    const { onUpdate, onDelete } = useContext(TodoContext);

    const onChangeCheckbox = () => {
        onUpdate(id);
    }

    const onDeleteButton = () => {
        onDelete(id);
    }


    return (
        <div className="TodoItem">
            <input type="checkbox" checked={isDone} onChange={onChangeCheckbox} />
            <div className="content">{content}</div>
            <div className="date">{new Date(date).toLocaleDateString()}</div>
            <button onClick={onDeleteButton}>삭제</button>
        </div>
    );

}


// 최적화된 컴포넌트를 반환한다.
// Props 값이 변경되는 경우에만 리렌더링된다.
// onUpdate, onDelete 함수 때문에 Props 값이 변경되었다고 인식한다.
// hoc : 고차 컴포넌트 (high order component)

/*
export default memo(TodoItem, (prevProps, nextProps) => {
    if (prevProps.id !== nextProps.id) {
        return false;  // 리렌더링 하라!!
    }
    if (prevProps.isDone !== nextProps.isDone) {
        return false;
    }
    if (prevProps.content !== nextProps.content) {
        return false;
    }
    if (prevProps.date !== nextProps.date) {
        return false;
    }

    return true;   // 리렌더링하지 말라!!

});
*/

export default memo(TodoItem);
