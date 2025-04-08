const RETRY_COUNT = 2;

export const _apiCall = async (service, path, method, data) => {
  let retry = RETRY_COUNT;
  while (retry > 0) {
    try {
      const jsonData = JSON.stringify(data);

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

      if (m === 'GET') {
        config.params = jsonData;
      } else {
        config.body = jsonData;
      }

      const res = await fetch(`${service}${path}`, config);
      const resObj = await res.json();
      if (res.status === 401) {
        const userId = localStorage.getItem('userId');
        const refreshRes = await fetch(`${service}newAccessToken`, {
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

        localStorage.setItem('accessToken', refreshResObj);
      }
      return { ...resObj, status: 200 };
    } catch (e) {
      console.log(e);
    }
    retry -= 1;
  }
};

const requestNewAccessToken = async () => {
  try {
  } catch (err) {
    console.log(err);
  }
};
