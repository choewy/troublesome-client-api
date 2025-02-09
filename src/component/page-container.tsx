import { PropsWithChildren } from 'react';

export type PageContainerProps = {
  backgroundImagePath?: string;
} & PropsWithChildren;

export const PageContainer = (props: PageContainerProps) => {
  return (
    <main
      style={{
        position: 'absolute',
        background: props.backgroundImagePath ? `url(${props.backgroundImagePath})` : 'unset',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      {props.children}
    </main>
  );
};
