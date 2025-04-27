import { API_SERVICES } from '../constants';

const RETRY_COUNT = 2;

export const _apiCall = async (service, path, method, data) => {
  let retry = RETRY_COUNT;
  while (retry > 0) {
    try {
      let urlParams = '';
      const accessToken = localStorage.getItem('accessToken');
      const m = method.toUpperCase();

      let config = {
        method: m,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      };

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      if (m !== 'GET') {
        const jsonData = JSON.stringify(data);
        config.body = jsonData;
      } else {
        urlParams = new URLSearchParams(data);
      }

      const res = await fetch(
        `${service}${path}${m === 'GET' ? '?' + urlParams.toString() : ''}`,
        config,
      );
      const resObj = await res.json();
      console.log('Res: ', { ...resObj, status: res.status });

      if (res.status === 401) {
        console.log('Retrying token');
        const userId = localStorage.getItem('userId');
        const refreshRes = await fetch(`${API_SERVICES.user}${`accessToken`}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            userId: userId,
          }),
        });

        const refreshResObj = await refreshRes.json();

        localStorage.setItem('accessToken', refreshResObj.accessToken);
      } else {
        return { ...resObj, status: res.status, success: true };
      }
    } catch (e) {
      console.log(e);
    }
    retry -= 1;
  }
  return { success: false };
};

export const checkForUserOrg = () => {
  const userHasOrg = localStorage.getItem('userHasOrg');
  const userHasOrgBool = userHasOrg === 'true';
  return userHasOrgBool;
};

export const calculateServiceTotals = (services, taxesAndFeeRates) => {
  const servicesList = services;
  const tfList = taxesAndFeeRates;
  let retSubTotal = 0;
  let taxAndFeesTotal = 0;
  let totalPrice = 0;
  for (let service of servicesList) {
    const price = service.price;
    retSubTotal += price;

    let totalTFMultiplier = 0;
    let totalTFFlatAdd = 0;

    for (let tf of service.taxesAndFees) {
      const taxAndFee = tfList.find((t) => t.code === tf.code);
      const type = taxAndFee.type;
      const tfAmount = taxAndFee.amount;
      if (type === 'percent') {
        totalTFMultiplier += tfAmount;
      } else if (type === 'flat') {
        totalTFFlatAdd += tfAmount;
      }
    }

    taxAndFeesTotal += price * (totalTFMultiplier / 100);
    taxAndFeesTotal += totalTFFlatAdd;
  }
  totalPrice = taxAndFeesTotal + retSubTotal;
  return {
    subTotal: toFixedNumber(retSubTotal),
    taxAndFeesTotal: toFixedNumber(taxAndFeesTotal),
    totalPrice: toFixedNumber(totalPrice),
  };
};

export const toFixedNumber = (num, digits = 2, base = 10) => {
  const pow = Math.pow(base, digits);
  return Math.round(num * pow) / pow;
};
