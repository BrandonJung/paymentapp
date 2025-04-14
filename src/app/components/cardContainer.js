import { Card } from 'primereact/card';
import { containerMaxHeight } from '../utils/constants';
import { ProgressSpinner } from 'primereact/progressspinner';

const CardContainer = ({
  title,
  overflow = 'hidden',
  loading = false,
  children,
}) => {
  return (
    <div style={{ width: '100%' }}>
      <Card
        style={{
          overflowY: overflow,
          height: containerMaxHeight,
        }}
        title={title}>
        {children}
      </Card>
      {loading ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#000000',
            opacity: '60%',
          }}>
          <ProgressSpinner
            style={{ position: 'absolute', top: '40%', left: '40%' }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CardContainer;
