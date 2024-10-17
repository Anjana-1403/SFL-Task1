import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cards from './components/Cards';
import EditPage from './components/Edit';
import Details from './components/Details';
import CreatePage from './components/Create';

const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/details" element={<Details />} />   
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/create" element={<CreatePage />} />   
      </Routes>
    </Router>
  );
}

export default App;