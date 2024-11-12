import { render } from '@testing-library/react';
import App from '../src/App';
import React = require('react');
test("Renders the main page", () => {
    render(<App />)
  
    expect(true).toBeTruthy()
})