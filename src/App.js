import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Normalize } from 'styled-normalize';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/globals';
import theme from './styles/theme';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Normalize />
      <GlobalStyles />
      <Header />
      <div>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route>404 - Not Found</Route>
        </Switch>
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
