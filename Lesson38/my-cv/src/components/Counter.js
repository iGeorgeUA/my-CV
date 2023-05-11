import React from 'react';

export function Counter() {
  const [count, setCount] = React.useState(0);

  function increaseClick() {
    setCount(count + 1);
  }

  function decreaseClick() {
    setCount(count - 1);
  }

  return (
    <div>
      <h2>Counter:</h2><hr />
      <p>Current state: {count}</p>
      <button onClick = {increaseClick}>Increase</button>
      <button onClick = {decreaseClick}>Decrease</button>
    </div>
  );
}