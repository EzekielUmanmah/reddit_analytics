import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import * as S from './styles';

const Search = () => {
  const [subreddit, setSubreddit] = useState('javascript');
  const [posts, setPosts] = useState();
  const history = useHistory();

  const search = async (e) => {
    e.preventDefault();

    const url = `https://www.reddit.com/r/${subreddit}/top.json`;

    try {
      const { data } = await axios.get(url);
      setPosts(data.data.children);

      history.push(`/search/${subreddit}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setPosts(null);
    }
  };

  return (
    <S.Container>
      <S.Form>
        <S.Label>
          r /
          {'  '}
          <S.Input name="subreddit" type="text" value={subreddit} onChange={(e) => setSubreddit(e.target.value)} />
        </S.Label>
        <S.Button onClick={search}>Search</S.Button>
      </S.Form>
      <br />
      {posts ? posts.length : `/r ${subreddit} does not exist`}
    </S.Container>
  );
};

export default Search;
