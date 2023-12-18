export const filterRefs = (refs, subset) => {
  if (!refs || !subset) {
    return [];
  }
  if (!Array.isArray(refs) || !Array.isArray(subset)) {
    return [];
  }
  if (!refs.length || !subset.length) {
    return [];
  }
  /*
    if (!subset.hasOwnProperty('includes')) {
      return [];
    }*/
  return refs.filter((a) => subset.includes(a.id));
};
