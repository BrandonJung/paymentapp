import { Divider } from 'primereact/divider';

const InputSection = ({
  handleOnClick,
  showSection,
  sectionIndex,
  title,
  children,
}) => {
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
                if (showSection === sectionIndex) {
                  handleOnClick(-1);
                } else {
                  handleOnClick(sectionIndex);
                }
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
              onClick={() => {
                if (handleOnClick) {
                  if (showSection === sectionIndex) {
                    handleOnClick(-1);
                  } else {
                    handleOnClick(sectionIndex);
                  }
                }
              }}
              className={
                showSection === sectionIndex
                  ? 'pi pi-angle-up'
                  : 'pi pi-angle-down'
              }></i>
          ) : null}
        </div>
        {showSection === sectionIndex ? children : null}
      </div>
      <Divider />
    </>
  );
};

export default InputSection;
