'use client';

import { useCallback, useEffect, useState } from 'react';
import InputSection from '@/app/components/form/inputSection';

import { Button } from 'primereact/button';
import { convertPriceToDisplay } from '@/app/utils/helpers/formatters';
import {
  createDefaultServiceObj,
  validateCustomerFields,
  validateDate,
  validateLocationFields,
  validateServices,
} from '@/app/utils/helpers/form';
import { useRouter } from 'next/navigation';
import { Checkbox } from 'primereact/checkbox';
import {
  API_SERVICES,
  defaultCustomerObj,
  defaultDateObj,
  defaultLocationObj,
} from '@/app/utils/constants';
import {
  _apiCall,
  calculateServiceTotals,
  checkForUserOrg,
} from '@/app/utils/helpers/functions';
import CardContainer from '@/app/components/cardContainer';
import CustomerSection from '@/app/components/form/customerSection';
import LocationSection from '@/app/components/form/locationSection';
import ServiceSection from '@/app/components/form/serviceSection';
import DateSection from '@/app/components/form/dateSection';
import NoOrganizationPage from '@/app/components/noOrganizationPage';
import { Dialog } from 'primereact/dialog';

const NewJobPage = () => {
  const router = useRouter();

  const [existingCustomers, setExistingCustomers] = useState(null);
  const [existingLocations, setExistingLocations] = useState(null);
  const [existingServices, setExistingServices] = useState(null);
  const [organization, setOrganization] = useState(null);

  const [customer, setCustomer] = useState(defaultCustomerObj);
  const [location, setLocation] = useState(defaultLocationObj);
  const [services, setServices] = useState([]);
  const [date, setDate] = useState(defaultDateObj);

  const [showSection, setShowSection] = useState(0);
  const [isAnyEditing, setIsAnyEditing] = useState([]);

  const [sendToCustomer, setSendToCustomer] = useState(false);

  const [estimatedTotal, setEstimatedTotal] = useState(0);

  const [userId, setUserId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const [userHasOrg, setUserHasOrg] = useState(false);

  const retrieveExistingData = async (passedUserId) => {
    try {
      setLoading(true);
      const res = await _apiCall(API_SERVICES.job, 'existingData', 'get', {
        userId: passedUserId,
      });
      console.log('Existing Data', res);
      if (res.status === 200) {
        const modifiedExistingServices = res.existingServices.map((item) => {
          return { ...item, selected: false };
        });
        setExistingCustomers(res.existingCustomers);
        setExistingLocations(res.existingLocations);
        setExistingServices(modifiedExistingServices);
        setOrganization(res.organization);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    retrieveExistingData(userId);
  }, [userId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userIdRes = localStorage.getItem('userId');
      if (userIdRes) {
        setUserId(userIdRes);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      const userHasOrgRes = checkForUserOrg();
      setUserHasOrg(userHasOrgRes);
    }
  }, []);

  const calculateEstimatedTotal = (passedServices) => {
    let retTotal;
    if (passedServices?.length > 0 && organization) {
      retTotal = calculateServiceTotals(
        passedServices,
        organization.taxesAndFeeRates,
      );
    }
    if (retTotal?.totalPrice) {
      setEstimatedTotal(retTotal.totalPrice);
    }
  };

  useEffect(() => {
    calculateEstimatedTotal(services);
  }, [services]);

  const updateCustomer = useCallback((value, field) => {
    setCustomer((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }, []);

  const selectExistingCustomer = (passedCustomer) => {
    setCustomer({
      firstName: passedCustomer.firstName,
      lastName: passedCustomer.lastName,
      email: passedCustomer.email,
      phoneNumber: passedCustomer.phoneNumber,
      _id: passedCustomer._id,
    });
  };

  const resetCustomer = () => {
    setCustomer(defaultCustomerObj);
  };

  const updateLocation = useCallback((value, field) => {
    setLocation((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }, []);

  const selectExistingLocation = (passedLocation) => {
    const { address } = passedLocation;
    const { city, country, postalCode, province, street, unitNumber } = address;
    setLocation({
      city,
      country,
      postalCode,
      province,
      street,
      unitNumber,
      _id: passedLocation._id,
    });
  };

  const resetLocation = () => {
    setLocation(defaultLocationObj);
  };

  const addService = () => {
    const defaultServiceObj = createDefaultServiceObj();
    setServices((prevServices) => [...prevServices, defaultServiceObj]);
  };

  const saveService = (passedService) => {
    setServices((prevServices) =>
      prevServices.map((item) => {
        return item.identifier === passedService.identifier
          ? { ...item, ...passedService }
          : item;
      }),
    );
  };

  const deleteService = (passedService) => {
    setServices((prevServices) =>
      prevServices.filter(
        (item) => item.identifier !== passedService.identifier,
      ),
    );
    toggleExistingServiceSelected(passedService);
  };

  const toggleExistingServiceSelected = (passedService) => {
    setExistingServices((prevExistingServices) =>
      prevExistingServices.map((item) => {
        return item._id === passedService._id
          ? { ...item, selected: !item.selected }
          : item;
      }),
    );
  };

  const selectExistingService = (passedService) => {
    const { identifier, name, description, rate, price, taxesAndFees, _id } =
      passedService;
    const serviceObj = {
      identifier,
      name,
      description,
      rate,
      price,
      taxesAndFees,
      _id,
    };
    saveService(serviceObj);
    toggleExistingServiceSelected(passedService);
  };

  const updateIsAnyEditing = (index, isEditing) => {
    setIsAnyEditing((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = isEditing;
      return newStates;
    });
  };

  const removeIsAnyEditing = (index) => {
    const newList = [...isAnyEditing];
    newList.splice(index, 1);
    setIsAnyEditing(newList);
  };

  const updateDate = useCallback((value, field) => {
    setDate((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }, []);

  const handleCreateJob = async () => {
    const customerObj = customer;
    const locationObj = location;
    const servicesList = services;
    const dateObj = date;

    console.log(
      'Create Job Objects: ',
      customerObj,
      locationObj,
      servicesList,
      dateObj,
    );

    const customerIsValid = validateCustomerFields(customerObj);
    if (!customerIsValid.valid) {
      alert(customerIsValid.message);
      return;
    }
    const locationIsValid = validateLocationFields(locationObj);
    if (!locationIsValid.valid) {
      alert(locationIsValid.message);
      return;
    }
    const servicesIsValid = validateServices(servicesList);
    if (!servicesIsValid.valid) {
      alert(servicesIsValid.message);
      return;
    }
    const dateIsValid = validateDate(dateObj);
    if (!dateIsValid.valid) {
      alert(dateIsValid.message);
      return;
    }

    if (customerIsValid && locationIsValid && servicesIsValid && dateIsValid) {
      try {
        setLoading(true);
        const res = await _apiCall(API_SERVICES.job, 'create', 'post', {
          customer: customerObj,
          location: locationObj,
          services: servicesList,
          date: dateObj,
          userId,
          sendToCustomer,
        });
        console.log('Create job res', res);
        if (res.status === 200) {
          setShowDialog(true);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateOpenSection = (index) => {
    if (isAnyEditing.length === 0) {
      setShowSection(index);
    } else {
      const noServicesEditing = isAnyEditing.every((state) => state === false);
      if (noServicesEditing) {
        setShowSection(index);
      } else {
        alert('A service is not saved');
      }
    }
  };

  return (
    <CardContainer title={'Create New Job'} overflow='scroll'>
      {userHasOrg ? (
        <>
          <InputSection
            handleOnClick={updateOpenSection}
            showSection={showSection}
            sectionIndex={0}
            title={'Customer Information'}>
            <CustomerSection
              customer={customer}
              updateCustomer={updateCustomer}
              selectExistingCustomer={selectExistingCustomer}
              existingCustomers={existingCustomers}
              disableEditing={customer._id}
              resetCustomer={resetCustomer}
            />
          </InputSection>
          <InputSection
            handleOnClick={updateOpenSection}
            showSection={showSection}
            sectionIndex={1}
            title={'Location Details'}>
            <LocationSection
              location={location}
              updateLocation={updateLocation}
              selectExistingLocation={selectExistingLocation}
              existingLocations={existingLocations}
              disableEditing={location._id}
              resetLocation={resetLocation}
            />
          </InputSection>
          <InputSection
            handleOnClick={updateOpenSection}
            showSection={showSection}
            sectionIndex={2}
            title={'Service Details'}>
            <ServiceSection
              services={services}
              existingServices={existingServices}
              addService={addService}
              saveService={saveService}
              deleteService={deleteService}
              selectExistingService={selectExistingService}
              updateIsAnyEditing={updateIsAnyEditing}
              removeIsAnyEditing={removeIsAnyEditing}
              organization={organization}
            />
          </InputSection>
          <InputSection
            handleOnClick={updateOpenSection}
            showSection={showSection}
            sectionIndex={3}
            title={'Date Details'}
            section={DateSection}>
            <DateSection date={date} updateDate={updateDate} />
          </InputSection>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
            <Checkbox
              onChange={(e) => setSendToCustomer(e.checked)}
              checked={sendToCustomer}
            />
            <label
              htmlFor='ingredient1'
              className='ml-2'
              style={{ marginLeft: 6 }}>
              Send confirmation email to customer
            </label>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Button
              style={{ marginRight: 10 }}
              onClick={() => handleCreateJob()}>
              Create Job
            </Button>
            <div>
              Estimated Total:{' '}
              {`$${convertPriceToDisplay(estimatedTotal).toFixed(2)}`}
            </div>
          </div>
        </>
      ) : (
        <NoOrganizationPage />
      )}
      <Dialog
        header='Success!'
        visible={showDialog}
        closeOnEscape
        style={{ width: '50vw' }}
        onHide={() => {
          if (!showDialog) return;
          setShowDialog(false);
          router.push('/dashboard/jobs/manage');
        }}>
        <p>Job created</p>
      </Dialog>
    </CardContainer>
  );
};

export default NewJobPage;
