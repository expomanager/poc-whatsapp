import './App.css';
import React from 'react';

function App() {
  // const [backendData, setBackendData] = useState([{}]);

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/wppmessage", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": e.target.name.value,
        "telefono": e.target.telefono.value
      })
    })
  }
  // useEffect(() => {
  //   fetch("/api").then(response => response.json()).then(data => setBackendData(data));
  //   console.log(backendData);
  // }, [])

  return (
    <div className='web'>
      <form onSubmit={handleSubmit} className="App">
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="numero">Número de celular:</label>
        <input type="number" id="telefono" name="telefono" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
