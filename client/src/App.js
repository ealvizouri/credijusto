import {
  withRouter,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import styled, { css } from 'styled-components';
import LandingPage from './Views/LandingPage';
import Home from './Views/Home';

import './App.css';

const AppContainer = styled.div`
  height: 100%;
  background-color: white;
  color: #282c34;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${props => props.landingPage && css`
    background-color: #72335a;
    color: white;
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
