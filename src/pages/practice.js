import React, { useState, useEffect } from "react";

export default function Practice() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("useEffect executed");
    }, []);

    return (
        <>
            <h1>{count}</h1>

            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </>
    );
}