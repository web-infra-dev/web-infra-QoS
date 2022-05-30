import '@arco-design/web-react/dist/css/arco.css';
import './App.scss';
import styled from '@modern-js/runtime/styled';
import { NavBar } from './components/NavBar';
import { SideMenu } from './components/SideMenu';

const Container = styled.div`
  min-height: 100vh;
`;

const App = () => (
  <Container>
    <NavBar />
    <SideMenu />
  </Container>
);

export default App;
