import { Card } from 'primereact/card';
import { containerMaxHeight } from '../utils/constants';
import { ProgressSpinner } from 'primereact/progressspinner';

const CardContainer = ({
  title,
  overflow = 'hidden',
  isLoading = false,
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
        {!isLoading ? (
          children
        ) : (
          <ProgressSpinner
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
            }}
          />
        )}
      </Card>
    </div>
  );
};

export default CardContainer;
