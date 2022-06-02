import { MENU } from '@/shared/constant';
import { ContentBundleSize } from './ContentBundleSize';
import { ContentCompileSpeed } from './ContentCompileSpeed';
import { ContentInstallSpeed } from './ContentInstallSpeed';

export const Content = (props: { menuIndex: string }) => {
  const renderSubContent = () => {
    switch (props.menuIndex) {
      case MENU.BUNDLE_SIZE:
        return <ContentBundleSize />;
      case MENU.COMPILE_SPEED:
        return <ContentCompileSpeed />;
      case MENU.INSTALL_SPEED:
        return <ContentInstallSpeed />;
    }
    return null;
  };

  return (
    <div style={{ marginLeft: 260, marginTop: 56 }}>{renderSubContent()}</div>
  );
};
