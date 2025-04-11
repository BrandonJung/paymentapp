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
