/* eslint-disable no-param-reassign */
const getCollectionByKey = key =>
  fetch(`http://new.radar-online.mcdir.ru/cockpit/api/collections/get/${key}?token=197125d3878c8b0555a0a9dfab3403`)
    .then(response => response.json())
    .then(blob => blob.entries);

const getSingletonsByKey = key =>
  fetch(`http://new.radar-online.mcdir.ru/cockpit/api/singletons/get/${key}?token=197125d3878c8b0555a0a9dfab3403`)
    .then(response => response.json())
    .then(blob => blob);

export default { getCollectionByKey, getSingletonsByKey };
