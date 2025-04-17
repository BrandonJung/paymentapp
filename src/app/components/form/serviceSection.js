import { Button } from 'primereact/button';
import ServiceRow from './serviceRow';

const ServiceSection = ({
  services,
  existingServices,
  addService,
  saveService,
  deleteService,
  selectExistingService,
  updateIsAnyEditing,
  removeIsAnyEditing,
  organization,
}) => {
  return (
    <div>
      {services.map((service, index) => {
        return (
          <ServiceRow
            serviceObj={service}
            key={service?.identifier || crypto.randomUUID()}
            existingServices={existingServices}
            saveService={saveService}
            deleteService={deleteService}
            selectExistingService={selectExistingService}
            updateIsAnyEditing={updateIsAnyEditing}
            index={index}
            removeIsAnyEditing={removeIsAnyEditing}
            organization={organization}
          />
        );
      })}
      <Button onClick={() => addService()}>Add Service</Button>
    </div>
  );
};

export default ServiceSection;
