import React from 'react';
import ReactDOM from 'react-dom';

function Root() {
  return <h1>Hello, Salman.</h1>;
}

// Render the Root element into the DOM
ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);