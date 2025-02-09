import { getDevelopmentCardImagePath } from '@/persistaence/helpers';

export type DevelopmentCardImageProps = {
  cardId: number;
};

export const DevelopmentCardImage = (props: DevelopmentCardImageProps) => {
  return (
    <div
      style={{
        width: '130px',
        height: '180px',
        background: `url(${getDevelopmentCardImagePath(props.cardId)})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        borderRadius: '12px',
      }}
    />
  );
};
