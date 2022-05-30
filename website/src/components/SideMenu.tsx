import { Menu } from '@arco-design/web-react';
import styled from '@modern-js/runtime/styled';
import { IconInteraction, IconThunderbolt } from '@arco-design/web-react/icon';

const MenuItem = Menu.Item;

const Root = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 260px;
`;

const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  height: 48,
  fontSize: 15,
  marginBottom: 8,
};

export const SideMenu = () => (
  <Root>
    <Menu
      mode="vertical"
      defaultSelectedKeys={['1']}
      style={{
        height: '100%',
        padding: '16px 4px',
      }}
    >
      <MenuItem key="1" style={itemStyle}>
        <IconInteraction style={{ fontSize: 20 }} />
        Bundle Size
      </MenuItem>
      <MenuItem key="2" style={itemStyle}>
        <IconThunderbolt style={{ fontSize: 20 }} />
        Compile Speed
      </MenuItem>
    </Menu>
  </Root>
);
