import React, { type FC, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Session = lazy(async () => await import('./components/Session'));

const App: FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Session />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
