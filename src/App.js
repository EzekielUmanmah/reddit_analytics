import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Normalize } from 'styled-normalize';
import { ThemeProvider } from 'styled-components';

import { Container } from './styles';
import GlobalStyles from './styles/globals';
import theme from './styles/theme';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Search from './Components/Search/Search';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Normalize />
      <GlobalStyles />
      <Header />
      <Container>
        <Switch>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route>404 - Not Found</Route>
        </Switch>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
