import React, {useState} from "react";

const Pow2 = () => {
    const [pow2, setPow2] = useState(1);

    return(
        <div>
            <h3>Powers of 2</h3>
            <p>Power of 2: {Math.pow(2, pow2)}</p>
            <button onClick={() => setPow2(pow2 + 1)}>
                Increase
            </button>
            <button onClick={() => setPow2(pow2 - 1)}>
                Decrease
            </button>
        </div>
    )
}

export default Pow2;