import SummaryForm from '../SummaryForm';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('checkbox is unchecked by default', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();
});

test('checking checkbox enables button and unchecking disables button', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole('button', {
    name: /confirm order/i,
  });
  expect(button).toBeDisabled();
  userEvent.click(checkbox);
  expect(button).toBeEnabled();
  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test('popover responds to hover', async () => {
  render(<SummaryForm />);
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  const termsAndConditions = screen.getByText(/terms and conditions/i);

  //popover start out hidden
  expect(nullPopover).not.toBeInTheDocument();

  //popover appears upon mouseover of checkbox label
  userEvent.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
