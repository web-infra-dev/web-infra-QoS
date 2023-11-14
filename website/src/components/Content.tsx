import { BASE_PADDING, MENU, PRODUCT } from '@/shared/constant';
import { ContentBundleSize } from './ContentBundleSize';
import { ContentCompileSpeed } from './ContentCompileSpeed';
import { ContentInstallSpeed } from './ContentInstallSpeed';
import { ContentCliSpeed } from './ContentCliSpeed';

export const Content = (props: { productIndex: string; menuIndex: string }) => {
  const renderSubContent = () => {
    if (props.productIndex === PRODUCT.RSPACK) {
      return (
        <div style={{ padding: BASE_PADDING }}>
          <div>
            <iframe
              src="https://web-infra-dev.github.io/rspack-ecosystem-benchmark/"
              title="Rspack Benchmark"
              style={{ width: '100%', height: '900px' }}
            ></iframe>
          </div>
        </div>
      );
    }

    switch (props.menuIndex) {
      case MENU.BUNDLE_SIZE:
        return <ContentBundleSize productIndex={props.productIndex} />;
      case MENU.COMPILE_SPEED:
        return <ContentCompileSpeed productIndex={props.productIndex} />;
      case MENU.INSTALL_SPEED:
        return <ContentInstallSpeed productIndex={props.productIndex} />;
      case MENU.CLI_SPEED:
        return <ContentCliSpeed productIndex={props.productIndex} />;
    }
    return null;
  };

  return (
    <div style={{ marginLeft: 260, marginTop: 56 }}>{renderSubContent()}</div>
  );
};
