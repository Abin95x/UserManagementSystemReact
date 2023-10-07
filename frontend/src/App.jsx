import React from 'react';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import UserRoute from './Routes/userRoute';
import AdminRoute from './Routes/adminRoute'

import Footer from './Components/Footer/Footer';
import "./index.css";
import './App.css'


function App(){
  return (
   <Router>
    
    <Routes>
      <Route path='/*' element={<UserRoute />} />
      <Route path='/admin/*' element={<AdminRoute/>} />
    </Routes>
    <Footer />
   </Router>

  );
}

export default App;
