import { Divider } from 'primereact/divider';

const InputSection = ({
  handleOnClick,
  showSection,
  sectionIndex,
  title,
  section,
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
                  handleOnClick(null);
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
                    handleOnClick(null);
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
        {/* Checks if function is passed, if it is then check if param is true */}
        {showSection === sectionIndex ? section() : null}
      </div>
      <Divider />
    </>
  );
};

export default InputSection;
