import { entities } from "$lib/entities";
// isFilteredIn, hasLatLng, translateToMarker, defaultFilterMethod, filterOptions, colorLegend

export const centerCircleId = 'recMQeRkiPRcQ6Fjw';

export const isFilteredIn = (record, arena, method, sector) => {
  if (record.id === centerCircleId) {
    return true;
  }
  console.log({record, arena, method, sector});
  if (
    arena === "ANY" &&
    sector === "ANY" &&
    method === "ANY"
  ) {
    return true;
  }
  if (arena !== "ANY") {
    if (
      typeof record.arenas === "undefined" ||
      !record.arenas.includes(arena)
    ) {
      return false;
    }
  }
  if (sector !== "ANY") {
    if (
      typeof record.sectors === "undefined" ||
      !record.sectors.includes(sector)
    ) {
      return false;
    }
  }
  if (method !== "ANY") {
    if (
      typeof record.methods === "undefined" ||
      !record.methods.includes(method)
    ) {
      return false;
    }
  }
  return true;
};

export const hasLatLng = (record) => {
  if (typeof record.lat === "undefined") {
    return false;
  }
  if (typeof record.lng === "undefined") {
    return false;
  }
  //console.log({ name: record.name, lat: record.lat, lng: record.lng })
  return true;
};

export const translateToMarker = (record) => {
  // console.log({
  //   cat: record.colorcategory,
  //   color: entities.sectorColors[record.colorcategory],
  // });
  const color = (record.sectors.length > 1) ? "gray" : entities.sectorColors[record.colorcategory];
  return {
    ...record,
    marker: {
      id: record.id,
      lat: record.lat || 40.04627940387934,
      lng: record.lng || -105.19855768328831,
      color: color,
      label: record.name,
      popupClassName: "class-name",
    },
  };
};

export const defaultFilterMethod = "active";
export const filterOptions = [
  {
    value: "active",
    label: "Active collaborators",
  },
  {
    value: "potential",
    label: "Potential collaborators",
  },
  {
    value: "all",
    label: "Whole network",
  },
];

export const colorLegend = [
  { color: "rgba(156, 46, 100, 1)", label: "Grassroots", method: {id: 'recRdF0TaAdUAj40V'}},
  { color: "rgba(167, 44, 10, 1)", label: "Nonprofit", method: {id: 'rec6f2I3uJzgPOne6'} },
  { color: "rgba(138, 72, 10, 1)", label: "Academia", method: {id: 'rec24VSkUdwdHXvAx'} },
  { color: "rgba(107, 87, 16, 1)", label: "Faith-based", method: {id: 'recBkVRn23w2hfMgA'} },
  { color: "rgba(36, 98, 101, 1)", label: "Government" , method: {id: 'recKEW8pPinfPIEOD'}},
  { color: "rgba(83, 81, 150, 1)", label: "Business", method: {id: 'recsL1hjg6GlM4SXG'} },
  //{ color: 'rgb(119, 70, 132)', label: "Off the charts" },
];

export const groupOrgsWithCollabs = (orgs, collabs) => {
  return collabs.map(function (c) {
    return {
      ...c,
      orgObjects: orgs.filter((o) => c.orgs.includes(o.id)),
    };
  });
}

export const getMethodsWithOrgCounts = (methods, orgs) => {
  return methods.map(function (m) {
    const orgObjects = orgs.filter((o) => o?.methods?.includes(m.id));
    return {
      ...m,
      orgCount: orgObjects.length,
      orgObjects: orgObjects,
    };
  });
}