import { Menu, MenuProps } from '@arco-design/web-react';
import styled from '@modern-js/runtime/styled';
import {
  IconLink,
  IconInteraction,
  IconThunderbolt,
  IconCloudDownload,
} from '@arco-design/web-react/icon';
import { MENU } from '@/shared/constant';

const MenuItem = Menu.Item;

const Root = styled.div`
  position: fixed;
  top: 56px;
  left: 0;
  bottom: 0;
  width: 260px;
  background: #fff;
`;

const BottomLink = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 6px;
  text-align: center;
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
  defaultSelectedKey: string;
}) => (
  <Root>
    <Menu
      mode="vertical"
      style={{
        padding: '16px 4px',
      }}
      onClickMenuItem={props.onClickMenuItem}
      defaultSelectedKeys={[props.defaultSelectedKey]}
    >
      <MenuItem key={MENU.BUNDLE_SIZE} style={itemStyle}>
        <IconInteraction style={{ fontSize: 20 }} />
        Bundle Size
      </MenuItem>
      <MenuItem key={MENU.COMPILE_SPEED} style={itemStyle}>
        <IconThunderbolt style={{ fontSize: 20 }} />
        Compile Speed
      </MenuItem>
      <MenuItem key={MENU.INSTALL_SPEED} style={itemStyle}>
        <IconCloudDownload style={{ fontSize: 20 }} />
        Install Speed
      </MenuItem>
    </Menu>

    <BottomLink>
      <a
        href="https://github.com/modern-js-dev/modern-js-benchmark/tree/gh-pages/data"
        target="_blank"
        style={{ color: '#2972b7' }}
      >
        <IconLink style={{ fontSize: 18, marginRight: 6, verticalAlign: -4 }} />
        View Raw Data
      </a>
    </BottomLink>
  </Root>
);
