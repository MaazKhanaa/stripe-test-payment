import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { StripeProvider } from './components/stripeProvider';
import { StripeCheckoutForm } from './components/stripeCheckoutForm';

function App() {
  return (
    <StripeProvider>
      <StripeCheckoutForm />
    </StripeProvider>
  );
}

export default App;
