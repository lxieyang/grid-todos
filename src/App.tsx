import React from 'react';

import NavBar from './containers/NavBar/NavBar';
import Layout from './containers/Layout/Layout';

import './App.css';

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <div style={{ marginTop: 56 }}>
        <Layout />
      </div>
    </>
  );
};

export default App;
