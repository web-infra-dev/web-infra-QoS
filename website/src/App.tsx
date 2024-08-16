import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import '@arco-design/web-react/dist/css/arco.css';
import './App.scss';
import { styled } from 'styled-components';
import { NavBar } from './components/NavBar';
import { SideMenu } from './components/SideMenu';
import { Content } from './components/Content';
import { useState } from 'react';
import { MENU, PRODUCT } from './shared/constant';

const Container = styled.div`
  min-height: 100vh;
`;

const BASENAME =
  process.env.NODE_ENV === 'production' &&
  window.location.hostname === 'web-infra-dev.github.io'
    ? '/web-infra-QoS/index'
    : '';

const App = () => {
  const query = new URLSearchParams(window.location.search);
  const initialProductIndex =
    query.get('product') || PRODUCT.RSBUILD;
  const initialMenuIndex = query.get('metrics') || MENU.COMPILE_SPEED;

  const [productIndex, setProductIndex] = useState(initialProductIndex);
  const [menuIndex, setMenuIndex] = useState(initialMenuIndex);
  const [openKeys, setOpenKeys] = useState<string[]>([
    `${initialProductIndex}`,
  ]);
  const [selectKeys, setSelectedKeys] = useState<string[]>([
    `${initialProductIndex}_${initialMenuIndex}`,
  ]);

  useEffect(() => {
    window.history.replaceState(
      null,
      '',
      `${BASENAME}?product=${productIndex}&metrics=${menuIndex}`,
    );
  }, [productIndex, menuIndex]);

  const handleClickSubMenu = (key: string): void => {
    if (openKeys.includes(key)) {
      const newKeys = openKeys.filter(item => item !== key);
      setOpenKeys(newKeys);
    } else {
      setOpenKeys([...openKeys, key]);
    }
  };

  const handleClickMenuItem = (key: string): void => {
    setProductIndex(key.split('_')[0]);
    setMenuIndex(key.split('_')[1]);
    setSelectedKeys([key]);
  };

  return (
    <Router basename={BASENAME}>
      <Container>
        <NavBar />
        <SideMenu
          openKeys={openKeys}
          selectedKeys={selectKeys}
          onClickMenuItem={handleClickMenuItem}
          onClickSubMenu={handleClickSubMenu}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Content
                key={productIndex}
                productIndex={productIndex}
                menuIndex={menuIndex}
              />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
