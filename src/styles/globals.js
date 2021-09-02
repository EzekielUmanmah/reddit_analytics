import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }
    html {
      scroll-behavior: smooth;
    }
    body {
        background: #f2f2eb;
        font-size: ${(props) => props.theme.font.size.default};
        font-family: ${(props) => props.theme.font.main};
        line-height: ${(props) => props.theme.font.lineHieght};
    }
    h1 {
        font-family: ${(props) => props.theme.font.title};
    }
    li {
        list-style: none;
    }
`;

export default GlobalStyles;
