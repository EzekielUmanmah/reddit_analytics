import styled from 'styled-components';

export const Article = styled.article`
  max-width: 738px;
  width: 100%;
  margin: 20px 0;
  padding: 20px;
  >* { text-align: left; }
`;

export const Headline = styled.h2`
  font-size: ${(props) => props.theme.font.size.default};
  font-family: ${(props) => props.theme.font.title};
  letter-spacing: 1.5px;
`;

export const Content = styled.div``;
