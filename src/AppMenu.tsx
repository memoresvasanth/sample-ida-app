import React, { useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { Menu } from 'primereact/menu';

const AppMenu: React.FC = () => {
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
      command: () => { window.location.pathname = "/document-home"; }
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
    <Menubar model={items} start={start} end={end} />
  );
}

export default AppMenu;