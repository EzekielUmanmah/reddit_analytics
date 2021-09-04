/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import * as S from './styles';

// const Posts = ({ posts }) => {
//   const post = posts.map((item) => (
//     <li key={item.data.id}>
//       {item.data.id}
//     </li>
//   ));
//   return (
//     <>{post}</>
//   );
// };

const Search = () => {
  const [subreddit, setSubreddit] = useState('javascript');
  const [posts, setPosts] = useState();
  const history = useHistory();

  const search = async (e) => {
    e.preventDefault();
    setPosts(null);

    const url = `https://www.reddit.com/r/${subreddit}/top.json?limit=100&t=year`;
    try {
      let count = 5;
      const temp = [];
      while (count > 0) {
        // eslint-disable-next-line no-await-in-loop
        const { data } = await axios.get(url);
        temp.push(...data.data.children);
        count -= 1;
      }
      setPosts(temp);
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
      {posts ? posts.length : ''}
    </S.Container>
  );
};

export default Search;
