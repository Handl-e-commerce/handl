import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Router } from '../Router';

function App() {
  return (
    <body className="App">
      <header className="App-header">
      </header>
      <RouterProvider router={Router} />
    </body>
  );
}

export default App;
