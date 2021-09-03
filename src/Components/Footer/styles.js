import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ReactComponent } from './logo.svg';

export const Logo = styled(ReactComponent)`
    display: block;
`;

export const Container = styled.footer`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: ${(props) => props.theme.size.footerHeight};
    margin: 0 auto;
`;

export const FooterLink = styled(Link)`
    font-size: ${(props) => props.theme.font.size.small};
    text-decoration: none;
    transition: .4s ease;
    &:visited {
        color: inherit;
    }
    &:hover {
        color: ${(props) => props.theme.color.midLight};
    }
`;
