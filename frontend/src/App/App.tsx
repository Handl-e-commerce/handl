import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Router } from '../Router';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <RouterProvider router={Router} />
      <Footer />
    </div>
  );
}

export default App;
