import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Router } from '../Router';

function App() {
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
