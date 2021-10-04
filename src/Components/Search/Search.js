/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import * as S from './styles';
import Form from './Form';
import fetchData from './api';

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
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('idle');
  const history = useHistory();

  const getData = async (subreddit) => {
    try {
      setStatus('loading');
      const data = await fetchData(subreddit);
      setPosts(data);
      setStatus('resolved');
      history.push(`/search/${subreddit}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.Container>
      <Form getData={getData} />
      <br />
      {
        status === 'loading' && (<div>Loading...</div>)
      }
      {
        status === 'resolved' && (
        <section>
          Posts:
          {posts.length}
        </section>
        )
      }
    </S.Container>
  );
};

export default Search;
