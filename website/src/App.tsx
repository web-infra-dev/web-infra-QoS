import '@arco-design/web-react/dist/css/arco.css';
import './App.scss';
import { styled } from 'styled-components';
import { NavBar } from './components/NavBar';
import { SideMenu } from './components/SideMenu';
import { Content } from './components/Content';
import { useState } from 'react';
import { MENU } from './shared/constant';

const Container = styled.div`
  min-height: 100vh;
`;

const App = () => {
  const [menuIndex, setMenuIndex] = useState(MENU.BUNDLE_SIZE);

  return (
    <Container>
      <NavBar />
      <SideMenu defaultSelectedKey={menuIndex} onClickMenuItem={setMenuIndex} />
      <Content menuIndex={menuIndex} />
    </Container>
  );
};

export default App;
