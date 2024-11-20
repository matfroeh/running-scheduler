const normalizeToArray = (obj) => {
  return Array.isArray(obj) ? obj : [obj];
};

export default normalizeToArray;
