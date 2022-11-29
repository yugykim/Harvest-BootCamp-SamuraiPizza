import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import PizzzaItem, { PizzaItemProps } from '../PizzaItem';
import { act } from 'react-dom/test-utils';
import { createTestPizza } from '../../../lib/test/helper/pizza';

describe('PizzzaItem', () => {
  const renderPizzaList = (props: PizzaItemProps) => {
    const view = renderWithProviders(<PizzzaItem {...props} />);

    return {
      ...view,
      $getName: () => screen.getByTestId(/^pizza-name/),
      $getPriceCents: () => screen.getByTestId(/^pizza-priceCents/),
      $getDescription: () => screen.getByTestId(/^pizza-description/),
      $getModifyButton: () => screen.getByRole('button'),
    };
  };

  const props = {
    handleOpen: jest.fn(),
    pizza: createTestPizza(),
  };

  test('should display all components of the pizza item', async () => {
    const { $getName, $getDescription, $getPriceCents, $getModifyButton } = renderPizzaList(props);

    expect($getName()).toBeVisible();
    expect($getDescription()).toBeVisible();
    expect($getPriceCents()).toBeVisible();
    expect($getModifyButton()).toBeVisible();
  });

  test('should call handleOpen when the modify button is clicked', async () => {
    const { $getModifyButton } = renderPizzaList(props);

    act(() => userEvent.click($getModifyButton()));

    expect(props.handleOpen).toHaveBeenCalledTimes(1);
  });
});
