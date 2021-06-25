import React from 'react';
import styled from 'styled-components';

import logo from '../../logo.png';
import favicon from '../../favicon.png';

const HeaderContainer = styled.div`
    background-color: #72335a;
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
`;

const Logo = styled.div`
  text-align: left;
  img {
    height: 20px;
  }
`;

const Logout = styled.span`
  cursor: pointer;
`;

const Header = ({ firstName }) => {
    return (<HeaderContainer>
        <Logo>
            <img src={favicon} alt="CRYPTOX - logo" />
        </Logo>
        <div>
          <span>Welcome {firstName}!</span>&nbsp;|&nbsp;
          <Logout>Log out</Logout>
        </div>
    </HeaderContainer>)
}

export default Header;