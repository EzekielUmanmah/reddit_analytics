import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import * as S from './styles';

const Header = () => (
  <S.Container>
    <Link to="/"><S.Logo /></Link>
    <S.NavLinkContainer>
      <li><S.NavLink to="/search/javascript">Search</S.NavLink></li>
      <li><S.NavLink to="/#how-it-works" as={HashLink}>How it works</S.NavLink></li>
      <li><S.NavLink to="/#about" as={HashLink}>About</S.NavLink></li>
    </S.NavLinkContainer>
  </S.Container>
);

export default Header;
