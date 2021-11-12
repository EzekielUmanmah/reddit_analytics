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
      if (data === 'error') {
        setStatus('error');
      } else {
        setPosts(data);
        setStatus('resolved');
        history.push(`/search/${subreddit}`);
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <S.Container>
      <Form getData={getData} />
      <br />
      {
          status === 'error' && 'There was a network error or you entered an invalid subreddit. Please try again.'
        }
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
