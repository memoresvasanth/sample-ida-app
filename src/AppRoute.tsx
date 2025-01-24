import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './Form';

const AppRoute: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <header className="App-header">
            <h1>Welcome to ResMed</h1>
          </header>
        } />
        <Route path="/form" element={<Form />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default AppRoute;