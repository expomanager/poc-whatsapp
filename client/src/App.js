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

  async function getTemplates(e) {
    e.preventDefault();
    await fetch("/gettemplates", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }

  async function createTemplate(e) {
    e.preventDefault();
    await fetch("/createtemplate", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": "test_variable",
        "components": [
          {
            "type": "BODY",
            "text": "Gracias por hacer la orden con nosotros. Tu orden está en camino. Avisanos cuando llegue. Bye Bye"
          },
        ],
      })
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
      <div className='template'>
        <button onClick={createTemplate}>Crear plantilla</button>
        <button onClick={getTemplates}>Obtener plantillas</button>
        <button onClick={editTemplate}>Editar plantilla</button>
        <button onClick={deleteTemplate}>Eliminar plantilla</button>
      </div>
    </div>
  );
}

export default App;
