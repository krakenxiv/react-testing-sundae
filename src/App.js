import React, { useState } from 'react';
import classes from './App.module.css';
import SummaryForm from '../src/pages/summary/SummaryForm';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/orderConfirmation/OrderConfirmation';
import Container from 'react-bootstrap/Container';
import { OrderDetailsProvider } from './contexts/OrderDetails';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');
  let Component = OrderEntry;

  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <Container className={classes.app}>
      <OrderDetailsProvider>
        {/* summary and entry page need provider */}
        <h1>Design Your Sundae!</h1>
        <Component setOrderPhase={setOrderPhase} />
      </OrderDetailsProvider>
      <SummaryForm />
    </Container>
  );
}

export default App;

//orderPhase at app level
//pass setter to top level components
//order entry, order summary, order confirmation
