import { Menu, MenuProps } from '@arco-design/web-react';
import styled from '@modern-js/runtime/styled';
import { IconInteraction, IconThunderbolt } from '@arco-design/web-react/icon';
import { MENU } from '@/constant';

const MenuItem = Menu.Item;

const Root = styled.div`
  position: fixed;
  top: 56px;
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

export const SideMenu = (props: {
  onClickMenuItem: MenuProps['onClickMenuItem'];
}) => (
  <Root>
    <Menu
      mode="vertical"
      style={{
        height: '100%',
        padding: '16px 4px',
      }}
      onClickMenuItem={props.onClickMenuItem}
      defaultSelectedKeys={[MENU.BUNDLE_SIZE]}
    >
      <MenuItem key={MENU.BUNDLE_SIZE} style={itemStyle}>
        <IconInteraction style={{ fontSize: 20 }} />
        Bundle Size
      </MenuItem>
      <MenuItem key={MENU.COMPILE_SPEED} style={itemStyle}>
        <IconThunderbolt style={{ fontSize: 20 }} />
        Compile Speed
      </MenuItem>
    </Menu>
  </Root>
);
