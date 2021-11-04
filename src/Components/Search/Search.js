/* eslint-disable no-return-assign */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import * as S from './styles';
import Form from './Form';
import fetchData from './api';

import Heatmap from './heatmap/heatmap';

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
          <S.HeatContainer>
            <Heatmap posts={posts} />
          </S.HeatContainer>
        )
      }
    </S.Container>
  );
};

export default Search;
