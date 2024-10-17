import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cards from './components/homepage/Cards';
import EditPage from './components/create_update/Edit';
import Details from './components/dashboard/Details';
import CreatePage from './components/create_update/Create';

const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/details" element={<Details />} />   
        <Route path="/edit/:program_name" element={<EditPage />} />
        <Route path="/create" element={<CreatePage />} />   
      </Routes>
    </Router>
  );
}

export default App;