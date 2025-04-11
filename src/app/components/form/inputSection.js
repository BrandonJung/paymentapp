import { Divider } from 'primereact/divider';

const InputSection = ({ handleOnClick, onClickParam, title, section }) => {
  return (
    <>
      <div style={{ margin: 10 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <h2
            style={{
              cursor: handleOnClick ? 'pointer' : 'default',
            }}
            onClick={() => {
              if (handleOnClick) {
                handleOnClick(!onClickParam);
              }
            }}>
            {title}
          </h2>
          {handleOnClick ? (
            <i
              style={{
                cursor: 'pointer',
                padding: 20,
              }}
              onClick={() => handleOnClick(!onClickParam)}
              className={
                onClickParam ? 'pi pi-angle-up' : 'pi pi-angle-down'
              }></i>
          ) : null}
        </div>
        {/* Checks if function is passed, if it is then check if param is true */}
        {!handleOnClick ? section() : onClickParam ? section() : null}
      </div>
      <Divider />
    </>
  );
};

export default InputSection;
