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

const App = () => {
  const [productIndex, setProductIndex] = useState(PRODUCT.MODERNJS_FRAMEWORK);
  const [menuIndex, setMenuIndex] = useState(MENU.BUNDLE_SIZE);
  const [openKeys, setOpenKeys] = useState<string[]>([
    `${PRODUCT.MODERNJS_FRAMEWORK}`,
  ]);
  const [selectKeys, setSelectedKeys] = useState<string[]>([
    `${PRODUCT.MODERNJS_FRAMEWORK}_${MENU.BUNDLE_SIZE}`,
  ]);

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
    <Container>
      <NavBar />
      <SideMenu
        openKeys={openKeys}
        selectedKeys={selectKeys}
        onClickMenuItem={handleClickMenuItem}
        onClickSubMenu={handleClickSubMenu}
      />
      <Content
        key={productIndex}
        productIndex={productIndex}
        menuIndex={menuIndex}
      />
    </Container>
  );
};

export default App;
