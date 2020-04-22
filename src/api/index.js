import axios from 'axios';

const apiClient = axios.create();

const token = '197125d3878c8b0555a0a9dfab3403';

async function getCollectionByKey(key) {
  const { data } = await apiClient({
    method: 'post',
    url: `/cockpit/api/collections/get/${key}?token=${token}`,
    data: {
      filter: {
        published: true,
      },
    },
  });
  return data.entries;
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
