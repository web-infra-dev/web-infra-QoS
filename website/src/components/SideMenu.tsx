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
  IconCloud,
  IconBook,
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
          Build performance
        </MenuItem>
        <MenuItem
          key={`${PRODUCT.RSBUILD}_${MENU.INSTALL_SPEED}`}
          style={itemStyle}
        >
          <IconCloudDownload />
          Install size
        </MenuItem>
        <MenuItem
          key={`${PRODUCT.RSBUILD}_${MENU.BUNDLE_SIZE}`}
          style={itemStyle}
        >
          <IconInteraction />
          Bundle size
        </MenuItem>
      </SubMenu>
      <SubMenu
        key={PRODUCT.RSPACK}
        title={
          <>
            <IconCloud /> Rspack
          </>
        }
      >
        <MenuItem
          key={`${PRODUCT.RSPACK}_${MENU.BINARY_SIZE}`}
          style={itemStyle}
        >
          <IconCamera />
          Binary size
        </MenuItem>
        <MenuItem key={`${PRODUCT.RSPACK}_benchmark`} style={itemStyle}>
          <IconCamera />
          Benchmark
        </MenuItem>
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
          Build performance
        </MenuItem>
        <MenuItem
          key={`${PRODUCT.RSPRESS}_${MENU.INSTALL_SPEED}`}
          style={itemStyle}
        >
          <IconCloudDownload />
          Install size
        </MenuItem>
        <MenuItem
          key={`${PRODUCT.RSPRESS}_${MENU.BUNDLE_SIZE}`}
          style={itemStyle}
        >
          <IconInteraction />
          Bundle size
        </MenuItem>
      </SubMenu>
      <SubMenu
        key={PRODUCT.RSLIB}
        title={
          <>
            <IconBook /> Rslib
          </>
        }
      >
        <MenuItem
          key={`${PRODUCT.RSLIB}_${MENU.COMPILE_SPEED}`}
          style={itemStyle}
        >
          <IconThunderbolt />
          Build performance
        </MenuItem>
        <MenuItem
          key={`${PRODUCT.RSLIB}_${MENU.INSTALL_SPEED}`}
          style={itemStyle}
        >
          <IconCloudDownload />
          Install size
        </MenuItem>
        <MenuItem
          key={`${PRODUCT.RSLIB}_${MENU.BUNDLE_SIZE}`}
          style={itemStyle}
        >
          <IconInteraction />
          Bundle size
        </MenuItem>
      </SubMenu>
      <SubMenu
        key={PRODUCT.MODERNJS_FRAMEWORK}
        title={
          <>
            <IconApps /> Modern.js
          </>
        }
      >
        <MenuItem
          key={`${PRODUCT.MODERNJS_FRAMEWORK}_${MENU.COMPILE_SPEED}`}
          style={itemStyle}
        >
          <IconThunderbolt />
          Build performance
        </MenuItem>
        <MenuItem
          key={`${PRODUCT.MODERNJS_FRAMEWORK}_${MENU.INSTALL_SPEED}`}
          style={itemStyle}
        >
          <IconCloudDownload />
          Install size
        </MenuItem>
        <MenuItem
          key={`${PRODUCT.MODERNJS_FRAMEWORK}_${MENU.BUNDLE_SIZE}`}
          style={itemStyle}
        >
          <IconInteraction />
          Bundle size
        </MenuItem>
      </SubMenu>
    </Menu>
  </Root>
);
