import { Button } from 'primereact/button';

const SaveDeleteEditButton = ({
  isEditing,
  handleDelete,
  handleSave,
  handleEdit,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent:
            isEditing && handleDelete ? 'space-between' : 'flex-end',
          flex: 1,
          marginRight: 20,
        }}>
        {isEditing && handleDelete ? (
          <Button
            onClick={() => {
              handleDelete();
            }}
            style={{
              backgroundColor: 'grey',
              borderColor: '#000000',
              color: '#000000',
            }}>
            {isEditing ? 'Delete' : 'Edit'}
            <i
              style={{
                color: '#000000',
                marginLeft: 10,
                cursor: 'pointer',
              }}
              className={isEditing ? 'pi pi-trash' : 'pi pi-pencil'}></i>
          </Button>
        ) : null}
        <Button
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              handleEdit();
            }
          }}>
          {isEditing ? 'Save' : 'Edit'}
          <i
            style={{
              marginLeft: 10,
              cursor: 'pointer',
            }}
            className={isEditing ? 'pi pi-check' : 'pi pi-pencil'}></i>
        </Button>
      </div>
    </div>
  );
};

export default SaveDeleteEditButton;
