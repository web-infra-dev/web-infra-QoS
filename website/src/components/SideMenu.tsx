import { Menu, MenuProps } from '@arco-design/web-react';
import { styled } from 'styled-components';
import {
  IconApps,
  IconBug,
  IconBulb,
  IconCommand,
  IconCamera,
  IconInteraction,
  IconThunderbolt,
  IconCloudDownload,
  IconDashboard,
} from '@arco-design/web-react/icon';
import { MENU, PRODUCT } from '@/shared/constant';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  height: 38,
  fontSize: 13,
};

const Root = styled.div`
  position: fixed;
  top: 56px;
  left: 0;
  bottom: 0;
  width: 260px;
  background: #fff;
  overflow: auto;
`;

export const SideMenu = (props: {
  openKeys: string[];
  selectedKeys: string[];
  onClickMenuItem: MenuProps['onClickMenuItem'];
  onClickSubMenu: MenuProps['onClickSubMenu'];
}) => (
  <Root>
    <Menu
      mode="vertical"
      style={{
        padding: '16px 4px',
        fontSize: 15,
      }}
      openKeys={props.openKeys}
      selectedKeys={props.selectedKeys}
      onClickMenuItem={props.onClickMenuItem}
      onClickSubMenu={props.onClickSubMenu}
    >
      <SubMenu
        key={PRODUCT.RSBUILD}
        title={
          <>
            <IconBulb /> Rsbuild
          </>
        }
      >
        <MenuItem
          key={`${PRODUCT.RSBUILD}_${MENU.COMPILE_SPEED}`}
          style={itemStyle}
        >
          <IconThunderbolt />
          Compile Speed
        </MenuItem>
        <MenuItem
          key={`${PRODUCT.RSBUILD}_${MENU.INSTALL_SPEED}`}
          style={itemStyle}
        >
          <IconCloudDownload />
          Install Speed
        </MenuItem>
        <MenuItem
          key={`${PRODUCT.RSBUILD}_${MENU.BUNDLE_SIZE}`}
          style={itemStyle}
        >
          <IconInteraction />
          Bundle Size
        </MenuItem>
        {/* <MenuItem
          key={`${PRODUCT.RSBUILD}_${MENU.CLI_SPEED}`}
          style={itemStyle}
        >
          <IconDashboard />
          Cli Speed
        </MenuItem> */}
      </SubMenu>
      <SubMenu
        key={PRODUCT.RSPRESS}
        title={
          <>
            <IconCommand /> Rspress
          </>
        }
      >
        <MenuItem
          key={`${PRODUCT.RSPRESS}_${MENU.COMPILE_SPEED}`}
          style={itemStyle}
        >
          <IconThunderbolt />
          Compile Speed
        </MenuItem>
        <MenuItem
          key={`${PRODUCT.RSPRESS}_${MENU.INSTALL_SPEED}`}
          style={itemStyle}
        >
          <IconCloudDownload />
          Install Speed
        </MenuItem>
        <MenuItem
          key={`${PRODUCT.RSPRESS}_${MENU.BUNDLE_SIZE}`}
          style={itemStyle}
        >
          <IconInteraction />
          Bundle Size
        </MenuItem>
        {/* <MenuItem
          key={`${PRODUCT.RSPRESS}_${MENU.CLI_SPEED}`}
          style={itemStyle}
        >
          <IconDashboard />
          Cli Speed
        </MenuItem> */}
      </SubMenu>
      <SubMenu
        key={PRODUCT.MODERNJS_FRAMEWORK}
        title={
          <>
            <IconApps /> Modern.js Framework
          </>
        }
      >
        <MenuItem
          key={`${PRODUCT.MODERNJS_FRAMEWORK}_${MENU.COMPILE_SPEED}`}
          style={itemStyle}
        >
          <IconThunderbolt />
          Compile Speed
        </MenuItem>
        <MenuItem
          key={`${PRODUCT.MODERNJS_FRAMEWORK}_${MENU.INSTALL_SPEED}`}
          style={itemStyle}
        >
          <IconCloudDownload />
          Install Speed
        </MenuItem>
        <MenuItem
          key={`${PRODUCT.MODERNJS_FRAMEWORK}_${MENU.BUNDLE_SIZE}`}
          style={itemStyle}
        >
          <IconInteraction />
          Bundle Size
        </MenuItem>
        {/* <MenuItem
          key={`${PRODUCT.MODERNJS_FRAMEWORK}_${MENU.CLI_SPEED}`}
          style={itemStyle}
        >
          <IconDashboard />
          Cli Speed
        </MenuItem> */}
      </SubMenu>
      <SubMenu
        key={PRODUCT.MODERNJS_MODULE}
        title={
          <>
            <IconBug /> Modern.js Module
          </>
        }
      >
        <MenuItem
          key={`${PRODUCT.MODERNJS_MODULE}_${MENU.COMPILE_SPEED}`}
          style={itemStyle}
        >
          <IconThunderbolt />
          Compile Speed
        </MenuItem>
        <MenuItem
          key={`${PRODUCT.MODERNJS_MODULE}_${MENU.INSTALL_SPEED}`}
          style={itemStyle}
        >
          <IconCloudDownload />
          Install Speed
        </MenuItem>
        <MenuItem
          key={`${PRODUCT.MODERNJS_MODULE}_${MENU.BUNDLE_SIZE}`}
          style={itemStyle}
        >
          <IconInteraction />
          Bundle Size
        </MenuItem>
        {/* <MenuItem
          key={`${PRODUCT.MODERNJS_MODULE}_${MENU.CLI_SPEED}`}
          style={itemStyle}
        >
          <IconDashboard />
          Cli Speed
        </MenuItem> */}
      </SubMenu>
      <MenuItem key={PRODUCT.RSPACK}>
        <IconCamera />
        <span style={{ marginLeft: '4px' }}>Rspack</span>
      </MenuItem>
    </Menu>
  </Root>
);
