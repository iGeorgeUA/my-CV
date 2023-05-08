export function Counter() {
  const [count, setCount] = React.useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h2>Counter:</h2><hr />
      <p>You clicked the button {count} times</p>
      <button onClick = {handleClick}>Click me</button>
    </div>
  );
}