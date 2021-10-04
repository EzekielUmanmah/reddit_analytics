/* eslint-disable max-len */
import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import App from '../../App';

import mockResponse1 from '../../__mocks__/subreddit-nba-response-1.json';
import mockResponse2 from '../../__mocks__/subreddit-nba-response-2.json';
import mockResponse3 from '../../__mocks__/subreddit-nba-response-3.json';
import mockResponse4 from '../../__mocks__/subreddit-nba-response-4.json';
import mockResponse5 from '../../__mocks__/subreddit-nba-response-5.json';

jest.mock('axios');

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
  beforeEach(() => jest.clearAllMocks);

  it('has input element that a user can use to search for a subreddit', () => {
    setup('/search');

    const input = screen.getByLabelText('r /');
    // clear input first or 'reactjs' appends to default value 'javascript'
    // supposedly resolved at https://github.com/testing-library/user-event/issues/301
    userEvent.clear(input);
    userEvent.type(input, 'reactjs');

    const subreddit = screen.getByDisplayValue(/reactjs/i);
    expect(subreddit).toBeInTheDocument();
    expect(input.value).toBe('reactjs');
  });

  it('loads NBA subreddit data', async () => {
    // Because I'm testing a chained API request, every call resolves with a Promise,
    // instead of the data (I could possibly extract the final return variable **data**
    // from fetchData(), and pass it as props to fetchData().)
    // Instead I mocked out the response object for each call, and verify that each
    // call is called with the correct query param. **after**, thereby indirectly
    // confirming that fetchData() returns the correct result for each call.

    axios.get = jest.fn()
      .mockResolvedValueOnce({ data: { data: { children: [...mockResponse1.data.children], after: mockResponse1.data.after } } })
      .mockResolvedValueOnce({ data: { data: { children: [...mockResponse2.data.children], after: mockResponse2.data.after } } })
      .mockResolvedValueOnce({ data: { data: { children: [...mockResponse3.data.children], after: mockResponse3.data.after } } })
      .mockResolvedValueOnce({ data: { data: { children: [...mockResponse4.data.children], after: mockResponse4.data.after } } })
      .mockResolvedValueOnce({ data: { data: { children: [...mockResponse5.data.children], after: mockResponse5.data.after } } });

    setup('/search');

    const input = screen.getByLabelText('r /');
    userEvent.clear(input);
    userEvent.type(input, 'nba');

    const button = screen.getByRole('button', { name: /search/i });
    userEvent.click(button);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    const posts = await waitFor(() => screen.findByText(/posts/i), {
      timeout: 5000,
    });
    expect(posts).toBeInTheDocument();

    const first = axios.get.mock.calls[0].toString();
    const second = axios.get.mock.calls[1].toString();
    const third = axios.get.mock.calls[2].toString();
    const fourth = axios.get.mock.calls[3].toString();
    const fifth = axios.get.mock.calls[4].toString();

    // console.log(axios.get.mock);
    expect(first).toBe('https://www.reddit.com/r/nba/top.json?limit=100&t=year');
    expect(second).toBe('https://www.reddit.com/r/nba/top.json?limit=100&t=year&after=t3_jcc84t');
    expect(third).toBe('https://www.reddit.com/r/nba/top.json?limit=100&t=year&after=t3_mgfuln');
    expect(fourth).toBe('https://www.reddit.com/r/nba/top.json?limit=100&t=year&after=t3_md5vyv');
    expect(fifth).toBe('https://www.reddit.com/r/nba/top.json?limit=100&t=year&after=t3_jjrd8q');

    expect(axios.get).toHaveBeenCalledTimes(5);
  });
});
