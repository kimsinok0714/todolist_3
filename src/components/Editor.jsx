
import './Editor.css';
import { useState, useRef, useContext } from 'react';
import { TodoDispatchContext } from '../App';

const Editor = () => {

    // const data = useContext(TodoContext);
    // console.log(data);  // {todos, onCreate, onUpdate, onDelete}


    const { onCreate } = useContext(TodoDispatchContext);

    const contentRef = useRef();
    const [content, setContent] = useState('');

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const onSubmit = () => {
        if (content === "") {
            contentRef.current.focus();
            return;
        }
        onCreate(content);
        setContent('')
    }


    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            onSubmit();
        }
    }


    return (
        <div className="Editor">
            <input ref={contentRef} value={content} placeholder="새로운 Todo..." onChange={onChangeContent} onKeyDown={onKeyDown} />
            <button onClick={onSubmit}>추가</button>
        </div>
    );

}

export default Editor;