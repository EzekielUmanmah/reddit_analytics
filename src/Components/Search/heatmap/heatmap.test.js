import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import mockResponse1 from '../../../__mocks__/subreddit-nba-response-1.json';
import mockResponse2 from '../../../__mocks__/subreddit-nba-response-2.json';
import mockResponse3 from '../../../__mocks__/subreddit-nba-response-3.json';
import mockResponse4 from '../../../__mocks__/subreddit-nba-response-4.json';
import mockResponse5 from '../../../__mocks__/subreddit-nba-response-5.json';

import Heatmap from './heatmap';

// create a theme obj. and pass it to <Heatmap /> via <ThemeProvider> or the test fails;
// global style theme.font.title is not accessible in this test.
const theme = {
  font: {
    title: 'bitter',
  },
};

const posts = [
  ...mockResponse1.data.children,
  ...mockResponse2.data.children,
  ...mockResponse3.data.children,
  ...mockResponse4.data.children,
  ...mockResponse5.data.children,
];

const setup = () => {
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Heatmap posts={posts} />
      </ThemeProvider>
    </MemoryRouter>,
  );
};

describe('Post Table Item', () => {
  it('renders post author and title as links', async () => {
    setup();

    const cell = screen.getByTitle('Pos(1, 14) = 6');
    userEvent.click(cell);
    // test post title link
    const title = screen.getByRole('link', { name: '[Scottie Pippen] I’m heartbrok...' });
    expect(title).toHaveAttribute('href', 'https://www.reddit.com//r/nba/comments/mu6o2a/scottie_pippen_im_heartbroken_to_share_that/');
    expect(title).toHaveAttribute('target', '_blank');
    expect(title).toHaveAttribute('rel', 'noopener noreferrer');
    // test post author link
    const author = screen.getByRole('link', { name: '2222lil' });
    expect(author).toHaveAttribute('href', 'https://www.reddit.com/user/2222lil');
    expect(author).toHaveAttribute('target', '_blank');
    expect(author).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('is not a link when author is [deleted]', () => {
    setup();
    const cell = screen.getByTitle(/Pos\(1, 14\) = 6/i);
    userEvent.click(cell);

    const author = screen.getByRole('cell', { name: '[deleted]' });
    expect(author).not.toHaveAttribute('href');
    expect(author).not.toHaveAttribute('target');
    expect(author).not.toHaveAttribute('rel');
  });
});
