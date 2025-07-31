// src/contexts/StripeContext.js
import React, { createContext, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Load Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51RVB1zRtDkAxkLsAyedrbLE1klg3SAeUZr9hSzBlf1wCP8QBGjEXgKa5MQXIJ9Feb5demAuiHaFjr3D78cbGCFJp00fJ2l0Zgc');

const StripeContext = createContext();

export const useStripe = () => {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error('useStripe must be used within a StripeProvider');
  }
  return context;
};

export const StripeProvider = ({ children }) => {
  const options = {
    // You can customize appearance here
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#0570de',
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'system-ui, sans-serif',
        spacingUnit: '2px',
        borderRadius: '4px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeContext.Provider value={{}}>
        {children}
      </StripeContext.Provider>
    </Elements>
  );
};