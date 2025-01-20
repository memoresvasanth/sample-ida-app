import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';          // Core CSS
import 'primeicons/primeicons.css';                        // Icons
import 'primeflex/primeflex.css';                          // PrimeFlex
import './App.css';  // Import your custom styles
import Form from './Form';

const App: React.FC = () => {
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: () => { window.location.pathname = "/"; }
    },
    {
      label: 'Form',
      icon: 'pi pi-fw pi-file',
      command: () => { window.location.pathname = "/form"; }
    },
    {
      label: 'WebScrap',
      icon: 'pi pi-fw pi-globe',
      command: () => { window.location.pathname = "/webscrap"; }
    },
    {
      label: 'Document',
      icon: 'pi pi-fw pi-file',
      command: () => { window.location.pathname = "/document"; }
    }
  ];

  const start = <img alt="logo" src="ResMed_logo.jpg" height="40" className="logo"></img>;

  return (
    <Router>
      <div className="App">
        <Menubar model={items} start={start} />
        <Routes>
          <Route path="/" element={
            <header className="App-header">
              <h1>Welcome to ResMed</h1>
            </header>
          } />
          <Route path="/form" element={<Form />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;