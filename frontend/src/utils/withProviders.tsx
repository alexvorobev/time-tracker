import { FC } from 'react';

const withProviders =
  (...providers: FC[]) =>
  (WrappedComponent: FC) =>
  (props: JSX.IntrinsicAttributes) =>
    providers.reduceRight((accumulator, prov) => {
      let Provider: FC = prov;
      if (Array.isArray(prov)) {
        Provider = prov[0];

        return <Provider {...prov[1]}>{accumulator}</Provider>;
      }

      return <Provider>{accumulator}</Provider>;
    }, <WrappedComponent {...props} />);

export default withProviders;
