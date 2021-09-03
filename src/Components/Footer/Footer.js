import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Logo, FooterLink } from './styles';

const Footer = () => (
  <Container>
    <FooterLink to={{ pathname: 'https://profy.dev/employers' }} target="_blank">profy.dev</FooterLink>
    <Link to="/"><Logo /></Link>
    <FooterLink to="/terms">Terms &amp; Privacy</FooterLink>
  </Container>
);

export default Footer;
