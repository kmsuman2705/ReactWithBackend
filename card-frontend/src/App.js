// src/App.js
import React from 'react';
import CardList from './components/CardList';
import CardForm from './components/CardForm';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1>Card Management</h1>
      <CardForm />
      <CardList />
    </div>
  );
}

export default App;
