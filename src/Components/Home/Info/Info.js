import React from 'react';

import Info from './Item/Item';
import * as S from './styles';

const InfoSection = () => (
  <S.Container>
    <Info id="how-it-works" headline="How it works">
      <S.Item>We find the 500 top posts from the past year for a subreddit.</S.Item>
      <S.Item>The data is visualized in a heatmap grouped by weekday and hour of day.</S.Item>
      <S.Item>See immediately when to submit your reddit post.</S.Item>
    </Info>
    <Info id="about" headline="About">
      <S.Paragraph>
        This app was created during a course on
        {' '}
        <S.A href="https://profy.dev" target="_blank" rel="noreferrer nofollow">profy.dev</S.A>
        {' '}
        with the goal to implement
        a real-world application with professional workflows and tools like Kanban, Asana,
        Zeplin, GitHub, pull requests and code reviews.
        {' '}
        <S.A href="https://profy.dev/employers" target="_blank" rel="noreferrer nofollow">Click here for more information.</S.A>
      </S.Paragraph>
    </Info>
  </S.Container>
);

export default InfoSection;
