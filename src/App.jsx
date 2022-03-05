import React from 'react';
import Logo from './components/Logo';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './Routes/Users';
import UserInfo from './Routes/UserInfo';

export default function App() {
  return (
    <div className='min-h-screen bg-black'>
      <div className='container text-gray-50 py-3'>
        <Logo />
        <Routes>
          <Route path='/' element={<Users />}></Route>
          <Route path='/:name' element={<UserInfo />}></Route>
        </Routes>
      </div>
    </div>
  )
}
