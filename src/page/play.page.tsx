import { DevelopmentCardImage } from '@/component/development-card-image';
import { DevelopmentCardLevelImage } from '@/component/development-card-level-image';
import { TokenImage } from '@/component/token-image';
import { BOARD_IMAGE_PATH } from '@/persistaence/constants';
import { TokenName } from '@/persistaence/enums';
import { appStore } from '@/store/app.store';

export function PlayPage() {
  appStore.useChangeBackground(BOARD_IMAGE_PATH);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ display: 'flex', gap: '10px' }}>
        {Object.values(TokenName).map((tokenName) => (
          <TokenImage tokenName={tokenName} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: '50px' }}>
        <DevelopmentCardLevelImage level={3} />
        <div style={{ display: 'flex', gap: '10px' }}>
          {[81, 82, 83].map((cardId) => (
            <DevelopmentCardImage cardId={cardId} />
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '50px' }}>
        <DevelopmentCardLevelImage level={2} />
        <div style={{ display: 'flex', gap: '10px' }}>
          {[51, 52, 53].map((cardId) => (
            <DevelopmentCardImage cardId={cardId} />
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '50px' }}>
        <DevelopmentCardLevelImage level={1} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[1, 2, 3].map((cardId) => (
              <DevelopmentCardImage cardId={cardId} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
