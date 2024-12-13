import { useState } from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Meals from './Components/Meals/Meals';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Meals/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
