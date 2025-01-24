import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';          // Core CSS
import 'primeicons/primeicons.css';                        // Icons
import 'primeflex/primeflex.css';                          // PrimeFlex
import './App.css';  // Import your custom styles
import AppRoute from './AppRoute';
import MenubarComponent from './AppMenu';

const App: React.FC = () => {
  return (
    <div className="App">
      <MenubarComponent />
      <AppRoute />
    </div>
  );
}

export default App;