import styled from 'styled-components';

export const Container = styled.section`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`

`;

export const Button = styled.button`
  background-color: #f5bf42;
  border-radius: 5px;
  color: ${(props) => props.theme.color.light};
  margin-left: 10px;
`;

export const Input = styled.input`
  :focus, :active {
    border: 1px solid #d5d5d5;
  }
`;

export const Label = styled.label``;
