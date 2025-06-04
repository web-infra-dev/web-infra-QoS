import { BASE_PADDING, MENU, PRODUCT } from '@/shared/constant';
import { ContentBundleSize } from './ContentBundleSize';
import { ContentCompileSpeed } from './ContentCompileSpeed';
import { ContentInstallSpeed } from './ContentInstallSpeed';
import { ContentCliSpeed } from './ContentCliSpeed';
import { ContentBinarySize } from './ContentBinarySize';

export const Content = (props: { productIndex: string; menuIndex: string }) => {
  const renderSubContent = () => {
    if (props.productIndex === PRODUCT.RSPACK) {
      if (props.menuIndex === MENU.BINARY_SIZE) {
        return <ContentBinarySize productIndex={props.productIndex} />;
      }

      return (
        <div style={{ padding: BASE_PADDING }}>
          <div>
            <iframe
              src="https://ecosystem-benchmark.rspack.rs/"
              title="Rspack Benchmark"
              style={{ width: '100%', height: '900px', border: 'none' }}
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
