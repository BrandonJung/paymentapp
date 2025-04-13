'use client';

import { useCallback, useEffect, useState } from 'react';
import InputSection from '@/app/components/form/inputSection';

import { Button } from 'primereact/button';
import { formatPriceDisplay } from '@/app/utils/helpers/formatters';
import {
  createDefaultServiceObj,
  validateCustomerFields,
  validateDate,
  validateLocationFields,
  validateServices,
} from '@/app/utils/helpers/form';
import { useRouter } from 'next/navigation';
import { Checkbox } from 'primereact/checkbox';
import InputDateSelect from '@/app/components/form/inputDateSelect';
import InputSelectButton from '@/app/components/form/inputSelectButton';
import {
  API_SERVICES,
  dateRangeOptions,
  defaultCustomerObj,
  defaultLocationObj,
} from '@/app/utils/constants';
import { _apiCall } from '@/app/utils/helpers/functions';
import CardContainer from '@/app/components/cardContainer';
import ContentContainer from '@/app/components/form/contentContainer';
import InputContainer from '@/app/components/form/inputContainer';
import FieldContainer from '@/app/components/form/fieldContainer';
import CustomerSection from '@/app/components/form/customerSection';
import LocationSection from '@/app/components/form/locationSection';
import ServiceSection from '@/app/components/form/serviceSection';

const NewJobPage = () => {
  const router = useRouter();

  const [existingCustomers, setExistingCustomers] = useState(null);
  const [existingLocations, setExistingLocations] = useState(null);
  const [existingServices, setExistingServices] = useState(null);

  const [customer, setCustomer] = useState(defaultCustomerObj);
  const [location, setLocation] = useState(defaultLocationObj);
  const [services, setServices] = useState([]);

  // ------------------------------------- ^ cleaned up ----//

  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

  const [showSection, setShowSection] = useState(0);

  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [sendToCustomer, setSendToCustomer] = useState(false);

  const [userId, setUserId] = useState(null);

  const [loading, setLoading] = useState(false);

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
    const userIdRes = localStorage.getItem('userId');
    if (userIdRes) {
      setUserId(userIdRes);
    }
  }, []);

  const calculateEstimatedTotal = (services) => {
    let retTotal = 0;
    for (let service of services) {
      if (isNaN(service.price)) continue;
      let sPrice = service.price;
      let taxTotalMultiplier = 1;
      let flatAmount = 0;
      for (let taxAndFee of service.taxesAndFees) {
        if (taxAndFee.type === 'percentage') {
          taxTotalMultiplier += taxAndFee.amount;
        } else if (taxAndFee.type === 'flat') {
          flatAmount += taxAndFee.amount;
        }
      }
      let sTotalAmount = sPrice * taxTotalMultiplier;
      retTotal += sTotalAmount;
    }
    setEstimatedTotal(retTotal);
  };

  // useEffect(() => {
  //   if (selectedServices.length > 0) {
  //     calculateEstimatedTotal(selectedServices);
  //   }
  // }, [selectedServices]);

  // const selectExistingCustomer = (customer) => {
  //   if (!customer) return;
  //   const uFirstName = customer.firstName;
  //   const uLastName = customer.lastName;
  //   const uEmail = customer.email;
  //   const uPhoneNumber = customer.phoneNumber;
  //   setFirstName(uFirstName);
  //   setLastName(uLastName);
  //   setEmail(uEmail);
  //   setPhoneNumber(uPhoneNumber);
  //   setSelectedUsername(customer);
  // };

  // const selectExistingLocation = (location) => {
  //   const address = location.address;
  //   if (!address) return;
  //   const lStreet = address.street;
  //   const lUnitNumber = address.unitNumber;
  //   const lCity = address.city;
  //   const lProvince = address.province;
  //   const lPostalCode = address.postalCode;
  //   const lCountry = address.country;

  //   setStreet(lStreet);
  //   setUnitNumber(lUnitNumber);
  //   setCity(lCity);
  //   setProvince(lProvince);
  //   setPostalCode(lPostalCode);
  //   setCountry(lCountry);
  //   setSelectedLocation(location);
  // };

  const DateSection = () => {
    return (
      <ContentContainer>
        <InputContainer>
          <FieldContainer>
            <InputSelectButton
              title={'Service Dates'}
              value={selectedDateRange}
              setValue={setSelectedDateRange}
              options={dateRangeOptions}
              optionLabel={'label'}
            />
            <InputDateSelect
              title={
                selectedDateRange === 'multi'
                  ? 'Start Date'
                  : 'Choose service date'
              }
              value={selectedStartDate}
              setValue={setSelectedStartDate}
              placeholder={
                selectedDateRange === 'multi' ? 'Start date' : 'Service Date'
              }
            />
            {selectedDateRange === 'multi' ? (
              <InputDateSelect
                title={'End Date'}
                value={selectedEndDate}
                setValue={setSelectedEndDate}
                placeholder='End Date'
              />
            ) : null}
          </FieldContainer>
        </InputContainer>
      </ContentContainer>
    );
  };

  const handleCreateJob = async () => {
    console.log('Create job', customer, location, services);
    // const customerObj = {
    //   firstName,
    //   lastName,
    //   email,
    //   phoneNumber,
    // };
    // const locationObj = {
    //   street,
    //   unitNumber,
    //   city,
    //   province,
    //   postalCode,
    //   country,
    // };
    // const dateObj = {
    //   mode: selectedDateRange,
    //   startDate: selectedStartDate,
    //   endDate: selectedEndDate,
    // };
    // const servicesList = selectedServices;
    // const customerIsValid = validateCustomerFields(customerObj);
    // if (!customerIsValid.valid) {
    //   alert(customerIsValid.message);
    //   return;
    // }
    // const locationIsValid = validateLocationFields(locationObj);
    // if (!locationIsValid.valid) {
    //   alert(locationIsValid.message);
    //   return;
    // }
    // const servicesIsValid = validateServices(servicesList);
    // if (!servicesIsValid.valid) {
    //   alert(servicesIsValid.message);
    //   return;
    // }
    // const dateIsValid = validateDate(dateObj);
    // if (!dateIsValid.valid) {
    //   alert(dateIsValid.message);
    //   return;
    // }
    // if (selectedUsername._id) {
    //   customerObj._id = selectedUsername._id;
    // }
    // if (selectedLocation._id) {
    //   locationObj._id = selectedLocation._id;
    // }
    // if (customerIsValid && locationIsValid && servicesIsValid && dateIsValid) {
    //   try {
    //     setLoading(true);
    //     const res = await _apiCall(API_SERVICES.job, 'create', 'post', {
    //       customer: customerObj,
    //       location: locationObj,
    //       services: servicesList,
    //       date: dateObj,
    //       userId,
    //       sendToCustomer,
    //     });
    //     console.log('Create job res', res);
    //     if (res.status === 200) {
    //       alert('Job created');
    //       // router.push('/dashboard/jobs/manage');
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
  };

  // ------------ cleaned up ------------------- //

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

  return (
    <CardContainer title={'Create New Job'} overflow='scroll'>
      <InputSection
        handleOnClick={setShowSection}
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
        handleOnClick={setShowSection}
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
        handleOnClick={setShowSection}
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
        />
      </InputSection>
      <InputSection
        handleOnClick={setShowSection}
        showSection={showSection}
        sectionIndex={3}
        title={'Date Details'}
        section={DateSection}
      />
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
        <Checkbox
          onChange={(e) => setSendToCustomer(e.checked)}
          checked={sendToCustomer}
        />
        <label htmlFor='ingredient1' className='ml-2' style={{ marginLeft: 6 }}>
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
        <Button style={{ marginRight: 10 }} onClick={() => handleCreateJob()}>
          Create Job
        </Button>
        <div>Estimated Total: {formatPriceDisplay(estimatedTotal)}</div>
      </div>
    </CardContainer>
  );
};

export default NewJobPage;
