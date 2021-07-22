import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';
import Button from 'react-bootstrap/Button';

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();

  const handleClick = () => {
    setOrderPhase('review');
  };

  return (
    <div>
      <div style={{ marginTop: '20px' }}>
        <Options optionType="scoops" />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Options optionType="toppings" />
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Grand total: {orderDetails.totals['grandTotal']}</h2>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button variant="primary" type="submit" onClick={handleClick}>
          Order Sundae
        </Button>
      </div>
    </div>
  );
};

export default OrderEntry;
