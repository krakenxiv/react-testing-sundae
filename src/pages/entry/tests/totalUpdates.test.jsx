import { render, screen } from '../../../test-utils/testing-libraries-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

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

describe('grand total', () => {
  test('grand total starts at $0.00 and grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    });

    expect(grandTotal).toHaveTextContent('0.00');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('2.00');

    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('3.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    });

    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');
  });

  test('grand total updates properly if an item is removed', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('5.50');

    userEvent.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');
  });
});
