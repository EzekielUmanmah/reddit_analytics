import React from 'react';
import { screen, render } from '@testing-library/react';
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

describe('Header', () => {
  test('logo points to the home page', () => {
    setup();

    const logo = screen.getByRole('link', { name: /redditLogo.svg/i });
    userEvent.click(logo);

    expect(screen.getByRole('heading', { name: /no reactions to/i })).toBeInTheDocument();
  });

  test('Search link points to correct page', () => {
    const { history } = setup();

    const link = screen.getByRole('link', { name: /search/i });
    userEvent.click(link);

    expect(history.location.pathname).toBe('/search/javascript');
  });

  test('About link points to correct page', () => {
    const { history } = setup();

    const link = screen.getByRole('link', { name: /about/i });
    userEvent.click(link);

    expect(history.location.hash).toBe('#about');
  });

  test('How it works link points to correct page', () => {
    const { history } = setup();

    const link = screen.getByRole('link', { name: /how it works/i });
    userEvent.click(link);

    expect(history.location.hash).toBe('#how-it-works');
  });
});
