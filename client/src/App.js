import {
  withRouter,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import styled, { css } from 'styled-components';
import { style } from "./Utils";


import LandingPage from './Views/LandingPage';
import Home from './Views/Home';
import './App.css';

const { colors } = style;

const AppContainer = styled.div`
  height: 100%;
  background-color: ${colors.white};
  color: ${colors.shark};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${props => props.landingPage && css`
    background-color: ${colors.primary};
    color: ${colors.white};
  `}
`;

const App = withRouter(() => {
  const location = useLocation();
  return (
    <AppContainer landingPage={location.pathname === '/register'}>
      <Switch>
        <Route path="/register">
          <LandingPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </AppContainer>
  );
})

export default App;
