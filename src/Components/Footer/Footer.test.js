import React from 'react';
import { screen, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';

import App from '../../App';

const setup = (initialPath = '/') => {
  let history;
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Route
        path="*"
        render={(props) => {
          history = props.history;
          return null;
        }}
      />
      <App />
    </MemoryRouter>,
  );
  return { history };
};

describe('Footer', () => {
  test('logo points to home page', () => {
    setup();

    const container = document.querySelector('footer');
    const link = within(container).getByRole('link', { name: /logo.svg/i });
    userEvent.click(link);

    expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument();
  });

  test('profy.dev link points to external page', () => {
    setup();

    const container = document.querySelector('footer');
    const link = within(container).getByRole('link', { name: /profy\.dev/i });

    expect(link).toHaveAttribute('href', 'https://profy.dev/employers');
  });

  test('Terms & Privacy link points to correct page', () => {
    const { history } = setup();

    const link = screen.getByRole('link', { name: /terms & privacy/i });
    userEvent.click(link);

    expect(history.location.pathname).toBe('/terms');
  });
});
