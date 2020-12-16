import axios from 'axios';

const baseURL = 'https://radar-online.ru';

const apiClient = axios.create({
  baseURL,
});

const token = '197125d3878c8b0555a0a9dfab3403';

async function getCollectionByKey({ key, filter, options, populate }) {
  const { data } = await apiClient({
    method: 'post',
    url: `/cockpit/api/collections/get/${key}?token=${token}`,
    data: {
      filter,
      ...options,
      populate,
    },
  });
  return { data: data.entries, total: data.total };
}

async function getSingletonByKey(key) {
  const { data } = await apiClient({
    method: 'post',
    url: `/cockpit/api/singletons/get/${key}?token=${token}`,
  });
  return data;
}

async function sendForm(form) {
  const { data } = await apiClient({
    method: 'post',
    url: '/process.php',
    data: form,
  });
  return data;
}

async function getStaticData(lastUpdated) {
  const { data } = await apiClient({
    method: 'get',
    url: '/cockpit/getStaticData.php',
    params: {
      lastUpdated,
    },
  });
  return data;
}

export {
  baseURL,
  getCollectionByKey,
  getSingletonByKey,
  getStaticData,
  sendForm,
};
