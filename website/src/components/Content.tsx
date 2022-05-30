import { MENU, CASES, BUNDLE_SIZE_METRICS } from '@/shared/constant';
import { ContentBundleSize } from './ContentBundleSize';

export const Content = (props: { menuIndex: string }) => {
  const renderSubContent = () => {
    switch (props.menuIndex) {
      case MENU.BUNDLE_SIZE:
        return <ContentBundleSize />;
    }
    return null;
  };

  return <div style={{ marginLeft: 260 }}>{renderSubContent()}</div>;
};
