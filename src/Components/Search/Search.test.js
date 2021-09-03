import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';

import App from '../../App';

const setup = (initialPath = '/') => {
  let history;
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
      <Route
        path="*"
        render={(props) => {
          history = props.history;
          return null;
        }}
      />
    </MemoryRouter>,
  );
  return { history };
};

describe('Search component tests', () => {
  it('has input element that a user can use to search for a subreddit', async () => {
    setup('/search');

    const input = screen.getByLabelText(/r \//i);
    userEvent.type(input, 'nba');

    const subreddit = screen.getByDisplayValue(/nba/i);
    expect(subreddit).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /search/i });
    userEvent.click(button);
  });
});
