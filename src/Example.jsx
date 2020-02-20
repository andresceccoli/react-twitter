import React, { useState, useEffect } from "react";

const Example = () => {
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Click ${count}`;
  }, [count]);

  const [saludo, setSaludo] = useState('');
  useEffect(() => {
    setSaludo(`Hola ${name}, hiciste click ${count} veces!`);
  }, [count, name]);

  return (
    <div>
      <div>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <h6>{saludo}</h6>
    </div>
  );
}

export default Example;

// count -> title
//       -> saludo

// name -> saludo

// saludo <- [count, name]
// title <- [count]