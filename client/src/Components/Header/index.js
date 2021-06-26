import React from 'react';
import styled from 'styled-components';
import { style } from "../../Utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

import favicon from '../../favicon.png';

const { colors } = style;

const HeaderContainer = styled.div`
    background-color: ${colors.primary};
    color: ${colors.white};
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
    const dispatch = useDispatch();
    return (<HeaderContainer>
        <Logo>
            <img src={favicon} alt="CRYPTOX - logo" />
        </Logo>
        <div>
          <span>Welcome {firstName}!</span>&nbsp;|&nbsp;
          <Logout onClick={() =>  dispatch({ type: "UNSET_USER" })}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Logout>
        </div>
    </HeaderContainer>)
}

export default Header;