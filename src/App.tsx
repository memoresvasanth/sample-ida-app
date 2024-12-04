import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to ResMed R&D</h1>
        <h5>Version 1</h5>
        <p>{time}</p>
      </header>
    </div>
  );
}

export default App;