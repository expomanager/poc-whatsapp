import './App.css';
import React from 'react';

function App() {  
  
  async function deleteTemplate(e) {
    e.preventDefault();
    await fetch("/deletetemplate", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }

  async function editTemplate(e) {
    e.preventDefault();
    await fetch("/edittemplate", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }

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
