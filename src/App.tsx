import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Menu } from 'primereact/menu';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';          // Core CSS
import 'primeicons/primeicons.css';                        // Icons
import 'primeflex/primeflex.css';                          // PrimeFlex
import './App.css';  // Import your custom styles
import Form from './Form';

const App: React.FC = () => {
  const menu = useRef<Menu>(null);

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

  const userMenuItems = [
    { label: 'John Doe', icon: 'pi pi-user', disabled: true },
    { separator: true },
    { label: 'Settings', icon: 'pi pi-cog' },
    { label: 'Change Password', icon: 'pi pi-key' },
    { label: 'Logout', icon: 'pi pi-sign-out' }
  ];

  const start = <img alt="logo" src="ResMed_logo.jpg" height="60" className="logo"></img>;
  const end = (
    <div className="user-icon" onClick={(event) => menu.current?.toggle(event)} style={{ cursor: 'pointer' }}>
      <i className="pi pi-user" style={{ fontSize: '1.5em' }}></i>
      <Menu model={userMenuItems} popup ref={menu} />
    </div>
  );

  return (
    <Router>
      <div className="App">
        <Menubar model={items} start={start} end={end} />
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