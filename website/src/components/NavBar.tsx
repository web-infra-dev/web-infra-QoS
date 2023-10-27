import { styled } from 'styled-components';
import { IconGithub } from '@arco-design/web-react/icon';
import { BASE_PADDING } from '@/shared/constant';

const Root = styled.div`
  position: fixed;
  display: flex;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  padding: 4px ${BASE_PADDING}px;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
`;

const Left = styled.div`
  display: flex;
  font-size: 18px;
  align-items: center;
  color: #111;
`;

const Image = styled.img`
  height: 100%;
`;

const ImageWrapper = styled.div`
  width: 48px;
  height: 36px;
  overflow: hidden;
  margin-right: 16px;
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  font-size: 28px;
  color: #222;
`;

const GitHubIcon = () => (
  <Link
    target="_blank"
    href="https://github.com/web-infra-dev/web-infra-QoS"
  >
    <IconGithub />
  </Link>
);

export const NavBar = () => {
  return (
    <Root className="nav-bar">
      <Left>
        <ImageWrapper>
          <Image src="https://camo.githubusercontent.com/0e419e25ccf73fc3e186836cdec2f674f7a08b1eaf6ae1646464f9ea1593581c/68747470733a2f2f6c66332d7374617469632e62797465646e73646f632e636f6d2f6f626a2f6564656e2d636e2f7a712d75796c6b76542f6c6a68775a74686c61756b6a6c6b756c7a6c702f7765622d696e6672612d6c6f676f2e706e67" />
        </ImageWrapper>
        Web Infra QoS Dashboard
      </Left>
      <GitHubIcon />
    </Root>
  );
};
