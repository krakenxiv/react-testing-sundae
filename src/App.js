import classes from './App.module.css';
import SummaryForm from '../src/pages/summary/SummaryForm';
import OrderEntry from './pages/entry/OrderEntry';
import Container from 'react-bootstrap/Container';
import { OrderDetailsProvider } from './contexts/OrderDetails';

function App() {
  return (
    <Container className={classes.app}>
      <OrderDetailsProvider>
        {/* summary and entry page need provider */}
        <h1>Design Your Sundae!</h1>
        <h3>Scoops</h3>
        <OrderEntry />
        <h3>Toppings</h3>
        <SummaryForm />
      </OrderDetailsProvider>
      {/* confirmation page here */}
    </Container>
  );
}

export default App;
