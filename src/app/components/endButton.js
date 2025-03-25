const { Button } = require('primereact/button');

const EndButton = ({ title, handleOnClick }) => {
  return <Button label={title} onClick={() => handleOnClick()} />;
};

export default EndButton;
