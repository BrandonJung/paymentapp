import { Button } from 'primereact/button';
import ServiceRow from './serviceRow';

const ServiceSection = ({
  services,
  existingServices,
  addService,
  saveService,
  deleteService,
  selectExistingService,
}) => {
  return (
    <div>
      {services.map((service) => {
        return (
          <ServiceRow
            serviceObj={service}
            key={service?.identifier || crypto.randomUUID()}
            existingServices={existingServices}
            saveService={saveService}
            deleteService={deleteService}
            selectExistingService={selectExistingService}
          />
        );
      })}
      <Button onClick={() => addService()}>Add Service</Button>
    </div>
  );
};

export default ServiceSection;
