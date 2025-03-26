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
              cursor: 'pointer',
            }}
            onClick={() => handleOnClick(!onClickParam)}>
            {title}
          </h2>
          <i
            style={{
              cursor: 'pointer',
              padding: 20,
            }}
            onClick={() => handleOnClick(!onClickParam)}
            className={
              onClickParam ? 'pi pi-angle-up' : 'pi pi-angle-down'
            }></i>
        </div>
        {onClickParam ? section() : null}
      </div>
      <Divider />
    </>
  );
};

export default InputSection;
