import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Normalize } from 'styled-normalize';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/globals';
import theme from './styles/theme';

import Header from './Components/Header/Header';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Normalize />
      <GlobalStyles />
      <Header />
      <div>
        <Switch>
          <Route path="/">
            <h1>Home</h1>
          </Route>
          <Route>404 - Not Found</Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
