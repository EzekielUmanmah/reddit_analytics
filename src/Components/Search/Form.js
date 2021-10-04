/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import * as S from './styles';

const Form = ({ getData }) => {
  const [subreddit, setSubreddit] = useState('javascript');

  const onSubmit = (event) => {
    event.preventDefault();
    getData(subreddit);
  };

  return (
    <S.Form onSubmit={onSubmit}>
      <S.Label htmlFor="subreddit">
        r /
        {'  '}
        <S.Input autoFocus id="subreddit" name="subreddit" type="text" value={subreddit} onChange={(event) => setSubreddit(event.target.value)} />
      </S.Label>
      <S.Button type="submit">Search</S.Button>
    </S.Form>
  );
};

export default Form;
