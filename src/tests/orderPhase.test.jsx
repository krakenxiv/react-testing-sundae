import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('order phases for happy path', async () => {
  //render the app
  render(<App />);

  //add scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  const cherryCheckbox = await screen.findByRole('checkbox', {
    name: /cherries/i,
  });
  const orderButton = screen.getByRole('button', { name: /order sundae/i });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '2');
  userEvent.click(cherryCheckbox);

  const thankYouHeading = screen.getByRole('heading', {
    name: /thank you/i,
  });
  const summaryHeading = screen.getByRole('heading', {
    name: /order summary/i,
  });
  expect(thankYouHeading).toBeInTheDocument();
  expect(summaryHeading).toBeInTheDocument();
  expect(vanillaInput).toBeInTheDocument();
  expect(cherryCheckbox).toBeInTheDocument();

  //find and click order button
  userEvent.click(orderButton);
  // const orderInfo = await screen.findByRole('heading', {
  //   name: /your order number is/i,
  // });
  // expect(orderInfo).toHaveTextContent('Your');

  //accept terms and conditions for confirm order
  //confirm oder number on confirmation page
  //click new order number on confirmation page
  //check that scoops and toppings have been reset
  //do we need to await anything to avoid test errors?
});

// screen.debug()

/*
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    });
*/
