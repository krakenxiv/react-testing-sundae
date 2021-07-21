import { render, screen } from '../../../test-utils/testing-libraries-utils';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import Options from '../Options';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);

  // make sure total start at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check total
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });

  // clear out vanillaInput
  userEvent.clear(vanillaInput);
  // type 1 into vanillaInput
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolatge scoops to 2 and check total
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  expect(scoopsSubtotal).toHaveTextContent('6.00');
});
test('update toppings subtotal when toppings change', async () => {
  render(<Options optionType="toppings" />);

  // make sure total start at $0.00
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  const hotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: /hot fudge/i,
  });

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: /cherries/i,
  });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');
});
