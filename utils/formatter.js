const formatStores = (stores) => {
  const storesFormatted = stores.map((store) => storeFormatter(store));
  return storesFormatted;
};

const storeFormatter = (store) => {
  const storeString = JSON.stringify(store);
  let storeJson = JSON.parse(storeString);

  storeJson.id = storeJson._id;
  storeJson.concepts = conceptFormatter(storeJson.concepts);
  storeJson.currentBalance = balanceFormatter(storeJson.currentBalance);
  storeJson.active = activeFormatter(storeJson.active);
  storeJson.lastSale = daleFormatter(storeJson.lastSale);
  delete storeJson._id;
  delete storeJson.__v;

  return storeJson;
};

const conceptFormatter = (concepts) => {
  let orderedConcepts = [];
  for (let i = 1; i < 7; i++) {
    for (let j = 0; j < 6; j++) {
      if (concepts[j].number == i) {
        orderedConcepts.push(concepts[j]);
      }
    }
  }
  return orderedConcepts;
};

const balanceFormatter = (value) => {
  const numberFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return numberFormatter.format(value);
};

const activeFormatter = (value) => {
  value ? (value = "Si") : (value = "No");
  return value;
};

const daleFormatter = (value) => {
  return value.slice(0, 10).replace(new RegExp("-", "g"), "/");
};

module.exports = {
  formatStores,
};
