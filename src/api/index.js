import axios from 'axios';

const apiClient = axios.create();

const token = '197125d3878c8b0555a0a9dfab3403';

async function getCollectionByKey({ key, filter, options }) {
  const { data } = await apiClient({
    method: 'post',
    url: `/cockpit/api/collections/get/${key}?token=${token}`,
    data: {
      filter,
      ...options,
      populate: 1,
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
    url: '/order.php',
    data: form,
  });
  return data;
}

export { getCollectionByKey, getSingletonByKey, sendForm };
