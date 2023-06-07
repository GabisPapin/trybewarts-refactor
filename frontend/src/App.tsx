import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from 'Pages/Layout';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
    </Routes>
  );
};

export default App;
