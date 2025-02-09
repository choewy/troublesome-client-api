import { getDevelopmentCardLevelImagePath } from '@/persistaence/helpers';

export type DevelopmentCardLevelImageProps = {
  level: number;
};

export const DevelopmentCardLevelImage = (props: DevelopmentCardLevelImageProps) => {
  return (
    <div
      style={{
        width: '130px',
        height: '180px',
        background: `url(${getDevelopmentCardLevelImagePath(props.level)})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        borderRadius: '7px',
      }}
    />
  );
};
