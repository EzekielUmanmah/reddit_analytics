/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';

import * as S from './styles';

const Heatmap = ({ posts }) => {
  const [heatData, setHeatData] = useState();
  const [selectedPosts, setSelectedPosts] = useState();

  const xLabels = new Array(24).fill(0).map((_, i) => {
    let hour = new Date();
    hour.setHours(i);
    hour = hour.getHours();
    const ampm = hour >= 12 ? 'pm' : 'am';

    let hours = hour;
    hours %= 12;
    hours = hours || 12;
    return `${hours}:00${ampm}`;
  });

  const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const timeGrid = new Array(yLabels.length).fill(0).map(() => new Array(xLabels.length).fill(0));

  useEffect(() => {
    if (posts) {
      posts.reduce((accu, curr) => {
        const date = new Date(curr.data.created_utc * 1000);
        const hour = date.getHours();
        const day = date.getDay();
        // eslint-disable-next-line no-param-reassign
        accu[day][hour] += 1;
        setHeatData(accu);
        return accu;
      }, timeGrid);
    }
  }, [posts]);

  const table = (x, y) => {
    const filterPosts = posts.filter((post) => {
      const date = new Date(post.data.created_utc * 1000);
      const hour = date.getHours();
      const day = date.getDay();
      if (hour === y && day === x) {
        return post;
      }
      return null;
    });
    const sortPosts = filterPosts.sort((a, b) => {
      const aTime = new Date(a.data.created_utc * 1000);
      const bTime = new Date(b.data.created_utc * 1000);
      return aTime.getMinutes() - bTime.getMinutes();
    });
    setSelectedPosts(sortPosts);
  };

  const postsToTable = selectedPosts && selectedPosts.map((post) => {
    const date = new Date(post.data.created_utc * 1000);
    const time = date.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
    return (
      <S.Row key={post.data.id}>
        <S.Cell><S.Link href={`https://www.reddit.com/${post.data.permalink}`} target="_blank" rel="noopener noreferrer">{`${post.data.title.toString().substr(0, 30)}...`}</S.Link></S.Cell>
        <S.Cell>{`${time}`}</S.Cell>
        <S.Cell>{post.data.score}</S.Cell>
        <S.Cell>{post.data.num_comments}</S.Cell>
        <S.Cell>
          { post.data.author === '[deleted]'
            ? <p>{post.data.author}</p>
            : <S.Link href={`https://www.reddit.com/user/${post.data.author}`} target="_blank" rel="noopener noreferrer">{post.data.author}</S.Link>}
        </S.Cell>
      </S.Row>
    );
  });
  return (
    !heatData ? null
      : (
        <S.Container>
          <HeatMapGrid
            xLabels={xLabels}
            yLabels={yLabels}
            data={heatData}
            xLabelsStyle={(i) => ({
              color: i % 2 ? 'transparent' : '#777',
              fontSize: '.8rem',
            })}
            yLabelsStyle={() => ({
              fontSize: '1rem',
            })}
            square
            cellHeight="3.5rem"
            cellRender={(x, y, val) => val && <div title={`Pos(${x}, ${y}) = ${val}`}>{val}</div>}
            onClick={(x, y) => table(x, y)}
          />
          {
            selectedPosts && (
              <S.TableContainer>
                <h3>Posts</h3>
                <S.Table>
                  <S.THead>
                    <S.Row>
                      <S.Header>Title</S.Header>
                      <S.Header>Time Posted</S.Header>
                      <S.Header>Score</S.Header>
                      <S.Header>Comments</S.Header>
                      <S.Header>Author</S.Header>
                    </S.Row>
                  </S.THead>
                  <S.TBody>
                    {postsToTable}
                  </S.TBody>
                </S.Table>
              </S.TableContainer>
            )
          }
        </S.Container>
      )
  );
};

export default Heatmap;
