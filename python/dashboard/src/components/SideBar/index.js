import React from 'react';

import { Container, Header, Content } from './styles';
import Logo from '../../assets/images/logo_full.png';

const SideBar = () => (
  <Container>
    <Header>
      <img src={Logo} alt="Logo"/>
    </Header>
    <Content>
      <ul className="unstyled list-hover-slide">
        <li><a href="#">Colaboradores</a></li>
        <li><a href="#">Categorias</a></li>
      </ul>
    </Content>
  </Container>
)

export default SideBar;
