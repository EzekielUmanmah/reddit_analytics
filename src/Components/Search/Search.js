/* eslint-disable no-shadow */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
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
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  const search = async (e) => {
    e.preventDefault();
    try {
      const url = `https://www.reddit.com/r/${subreddit}/top.json?limit=100&t=year`;
      await axios.get(url)
        .then((res) => {
          setPosts(res.data.data.children);
          axios.get(`${url}&after=${res.data.data.after}`)
            .then((res) => {
              setPosts((post) => [...post, ...res.data.data.children]);
              axios.get(`${url}&after=${res.data.data.after}`)
                .then((res) => {
                  setPosts((post) => [...post, ...res.data.data.children]);
                  axios.get(`${url}&after=${res.data.data.after}`)
                    .then((res) => {
                      setPosts((post) => [...post, ...res.data.data.children]);
                      axios.get(`${url}&after=${res.data.data.after}`)
                        .then((res) => setPosts((post) => [...post, ...res.data.data.children]));
                    });
                });
            });
        });
      history.push(`/search/${subreddit}`);
    } catch (error) {
      console.log(error);
    }
  };
  console.log('posts', posts);
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
