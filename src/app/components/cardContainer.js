import { containerMaxHeight } from '../utils/constants';

const { Card } = require('primereact/card');

const CardContainer = ({ title, overflow = 'hidden', children }) => {
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
    </div>
  );
};

export default CardContainer;
