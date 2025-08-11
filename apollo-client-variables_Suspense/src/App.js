import React from 'react';
import axios from 'axios';
import Countries from './Countries';
import Lazy from './Lazy';

export default function App() {
  return (
    <div>
      <h1>Countries List</h1>
      <Lazy />
      {/* <Countries />; */}
    </div>
  );
}