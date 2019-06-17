const reduceToObject = addDomain => array => array.reduce((acc, value) => Object.assign({}, acc, {
  [value]: addDomain(value)
}), {});

const addDomain = domain => value => `${domain}/${value}`;

function normalizeAction(domain = '@', types = []) {
  const withDomain = addDomain(domain);
  return reduceToObject(withDomain)(types);
}

export default normalizeAction;
