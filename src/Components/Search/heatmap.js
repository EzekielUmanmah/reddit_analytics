/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';

const Heatmap = ({ posts }) => {
  const [heatData, setHeatData] = useState();

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

  return (
    !heatData ? null
      : (
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
          cellRender={(_x, _y, val) => val && <div>{val}</div>}
        />
      )
  );
};

export default Heatmap;
