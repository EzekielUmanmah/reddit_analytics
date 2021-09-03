import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Paragraph = styled.p`
  font-size: ${(props) => props.theme.font.size.small};
  color: ${(props) => props.theme.color.text};
  letter-spacing: 1px;
  line-height: ${(props) => props.theme.font.lineHeight};
`;

export const A = styled.a`
  text-decoration: none;
  color: blue;
`;

export const Item = styled.li`
  margin-left: 2px;
  list-style: inside; 
  line-height: ${(props) => props.theme.font.lineHeight};
  font-size: ${(props) => props.theme.font.size.small};
  color: ${(props) => props.theme.color.text};
`;
