import styled from 'styled-components';

export const Container = styled.section`
  margin-top: 50px;
`;

export const TableContainer = styled(Container)`
  width: 80%;
  max-width: 1000px;
  margin: auto;
  margin-top: 50px;
  font-family: ${(props) => props.theme.font.title};
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const THead = styled.thead`
  
`;

export const TBody = styled.tbody`

`;

export const Header = styled.th`
  border: 1px solid #b3b3b3;
`;

export const Row = styled.tr`
  text-align: left;
`;

export const Cell = styled.td`
  border: 1px solid #b3b3b3;
`;

export const Link = styled.a`
  text-decoration: none;
`;
