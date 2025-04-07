const RETRY_COUNT = 2;

export const _apiCall = async (service, path, method, data) => {
  let retry = RETRY_COUNT;
  while (retry > 0) {
    try {
      const jsonData = JSON.stringify(data);

      const m = method.toUpperCase();

      let config = {
        method: m,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      };

      if (m === 'GET') {
        config.params = jsonData;
      } else {
        config.body = jsonData;
      }

      const res = await fetch(`${service}${path}`, config);
      return res;
    } catch (e) {
      // Request for a new access token
      console.log(e);
    }
    retry -= 1;
  }
};
