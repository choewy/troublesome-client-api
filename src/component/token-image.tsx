import { TokenName } from '@/persistaence/enums';
import { getTokenImagePath } from '@/persistaence/helpers';

export type TokenImageProps = {
  tokenName: TokenName;
};

export const TokenImage = (props: TokenImageProps) => {
  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        background: `url(${getTokenImagePath(props.tokenName)})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        borderRadius: '50%',
      }}
    />
  );
};
