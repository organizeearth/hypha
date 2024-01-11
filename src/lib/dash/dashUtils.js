import { entities } from "$lib/entities";
// isFilteredIn, hasLatLng, translateToMarker, defaultFilterMethod, filterOptions, colorLegend

const alwaysShowCollab = false;

export const centerCircleId = 'recMQeRkiPRcQ6Fjw';

export const isFilteredIn = (record, arena, method, sector) => {
  if (alwaysShowCollab && record.id === centerCircleId) {
    return true;
  }
  //console.log({record, arena, method, sector});
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
      typeof record.sector === "undefined" ||
      !record.sector.includes(sector)
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
  const color = (record.sector.length > 1) ? "gray" : entities.sectorColors[record.colorcategory];
  return {
    ...record,
    marker: {
      id: record.id,
      lat: record.lat || 40.04627940387934,
      lng: record.lng || -105.19855768328831,
      color: color,
      sector: (record.sector.length > 1) ? record.sector[0].id : 0,
      label: record.name,
      popupClassName: "class-name",
    },
  };
};

export const defaultNetwork = "active";
export const networkOptions = [
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
  { color: "rgba(156, 46, 100, 1)", label: "Grassroots", sector: {id: 'recRdF0TaAdUAj40V'}},
  { color: "rgba(167, 44, 10, 1)", label: "Nonprofit", sector: {id: 'rec6f2I3uJzgPOne6'} },
  { color: "rgba(138, 72, 10, 1)", label: "Academia", sector: {id: 'rec24VSkUdwdHXvAx'} },
  { color: "rgba(107, 87, 16, 1)", label: "Faith-based", sector: {id: 'recBkVRn23w2hfMgA'} },
  { color: "rgba(36, 98, 101, 1)", label: "Government" , sector: {id: 'recKEW8pPinfPIEOD'}},
  { color: "rgba(83, 81, 150, 1)", label: "Business", sector: {id: 'recsL1hjg6GlM4SXG'} },
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