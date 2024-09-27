
import './Header.css';
import { memo } from 'react';


const Header = () => {

    return (
        <div className="Header">
            <h3>오늘은 🚟</h3>
            <h1>{new Date().toDateString()}</h1>
        </div>
    );

}


// 최적화된 컴포넌트를 반환
// 자신이 Props 값이 변경되는 경우에만 리렌더링 된다.
const memoizedHeader = memo(Header)

export default memoizedHeader;