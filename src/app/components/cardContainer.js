const { Card } = require('primereact/card');

const CardContainer = ({ title, overflow = 'hidden' }) => {
  return (
    <Card
      style={{ height: '100vh', overflowY: 'hidden', width: '100%' }}
      title={title}></Card>
  );
};

export default CardContainer;
