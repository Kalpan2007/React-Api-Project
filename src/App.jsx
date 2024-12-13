import { useState } from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Meals from './Components/Meals/Meals';
import Cocktails from './Components/Cocktails/Cocktails';
import Potter from './Components/Potter/Potter';
import Bank from './Components/Bank/Bank';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Meals/>}/>
        <Route path='/cocktails' element={<Cocktails/>}/>
        <Route path='/potter' element={<Potter/>}/>
        <Route path='/bank' element={<Bank/>}/>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
