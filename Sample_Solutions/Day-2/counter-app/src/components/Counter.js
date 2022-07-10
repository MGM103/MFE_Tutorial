import React, {useState} from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h3>Counter</h3>
            <p>The count is: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increase
            </button>
            <button onClick={() => setCount(count - 1)}>
                Decrease
            </button>
        </div>
    );
};

export default Counter;