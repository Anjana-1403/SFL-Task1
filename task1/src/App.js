import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cards from './components/Cards';
import Details from './components/Details';
import AddItem from './components/AddItem';

const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/details" element={<Details />} />
        <Route path="/add-item" element={<AddItem />} />
       
      </Routes>
    </Router>
  );
}

export default App;