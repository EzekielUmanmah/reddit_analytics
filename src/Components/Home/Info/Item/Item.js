import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

const Info = ({ id, headline, children }) => (
  <S.Article id={id}>
    <S.Headline>{headline}</S.Headline>
    <S.Content>{children}</S.Content>
  </S.Article>
);

export default Info;

Info.propTypes = {
  id: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
