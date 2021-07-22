//thank you
//your order number is ...
//as part of our terms and conditions nothing will happen now
//create new order button
//state = [orderNumber, setOrderNumber]
//null = display loading

// useEffect to call axios when mounts
//set orderNumber to axios response
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post('http://localhost:3030/order', {})
      .then((response) => {
        console.log(response);
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  const handleClick = () => {
    resetOrder();
    setOrderPhase('inProgress');
  };

  return (
    <div>
      {orderNumber ? (
        <>
          <h1>Thank you!</h1>
          <h2>Order Summary</h2>
          <h3>Your order number is {orderNumber}</h3>
          <p>As part of our terms and conditions nothing will happen now</p>
          <Button onClick={handleClick}>New Order</Button>
        </>
      ) : (
        <h3>Loading</h3>
      )}
    </div>
  );
};

export default OrderConfirmation;
