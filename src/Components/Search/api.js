/* eslint-disable consistent-return */
import axios from 'axios';

const fetchData = async (subreddit) => {
  const data = [];
  try {
    const url = `https://www.reddit.com/r/${subreddit}/top.json?limit=100&t=year`;

    await axios.get(url)
      .then((res) => {
        data.push(...res.data.data.children);
        return axios.get(`${url}&after=${res.data.data.after}`);
      })
      .then((res) => {
        data.push(...res.data.data.children);
        return axios.get(`${url}&after=${res.data.data.after}`);
      })
      .then((res) => {
        data.push(...res.data.data.children);
        return axios.get(`${url}&after=${res.data.data.after}`);
      })
      .then((res) => {
        data.push(...res.data.data.children);
        return axios.get(`${url}&after=${res.data.data.after}`);
      })
      .then((res) => {
        data.push(...res.data.data.children);
      });
  } catch (error) {
    return 'error';
  }
  return data;
};

export default fetchData;
