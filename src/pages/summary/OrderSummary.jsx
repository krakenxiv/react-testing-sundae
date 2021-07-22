import Button from 'react-bootstrap/Button';

const OrderSummary = ({ setOrderPhase }) => {
  const handleClick = () => {
    setOrderPhase('completed');
  };
  return (
    <div>
      <h1>Order Summary</h1>
      <Button onClick={handleClick}>Go to order confirmation</Button>
    </div>
  );
};

export default OrderSummary;
