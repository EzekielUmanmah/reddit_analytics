import React from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';
import heatmap from './table.png';

const HeroSection = () => (
  <S.Container>
    <S.Title>No reactions to your reddit posts?</S.Title>
    <S.Subtitle>
      Great timing, great results! Find the best time to post on your subreddit.
    </S.Subtitle>
    <S.StyledLink to="/search/javascript">Show me the best time</S.StyledLink>
    <S.Para>r/javascript</S.Para>
    <Link to="/search/javascript"><S.Image src={heatmap} alt="heatmap" /></Link>
  </S.Container>
);

export default HeroSection;
