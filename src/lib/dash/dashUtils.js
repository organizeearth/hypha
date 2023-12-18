import { entities } from "$lib/entities";
// isFilteredIn, hasLatLng, translateToMarker, defaultFilterMethod, filterOptions, colorLegend

export const centerCircleId = 'recMQeRkiPRcQ6Fjw';

export const isFilteredIn = (record, filters) => {
  if (record.id === centerCircleId) {
    return true;
  }
  if (
    filters.arena === "ANY" &&
    filters.sector === "ANY" &&
    filters.method === "ANY"
  ) {
    return true;
  }
  if (filters.arena !== "ANY") {
    if (
      typeof record.arenas === "undefined" ||
      !record.arenas.includes(filters.arena)
    ) {
      return false;
    }
  }
  if (filters.sector !== "ANY") {
    if (
      typeof record.sectors === "undefined" ||
      !record.sectors.includes(filters.sector)
    ) {
      return false;
    }
  }
  if (filters.method !== "ANY") {
    if (
      typeof record.methods === "undefined" ||
      !record.methods.includes(filters.method)
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
  return {
    ...record,
    marker: {
      id: record.id,
      lat: record.lat || 40.04627940387934,
      lng: record.lng || -105.19855768328831,
      color: entities.sectorColors[record.colorcategory],
      label: record.name,
      popupClassName: "class-name",
    },
  };
};

export const defaultFilterMethod = "collab";
export const filterOptions = [
  {
    value: "collab",
    label: "Collab orgs only",
  },
  {
    value: "all",
    label: "All network orgs",
  },
];

export const defaultClusterMethod = "concentric";
export const clusterOptions = [
  {
    value: "concentric",
    label: "Concentric",
  },
  {
    value: "blob",
    label: "Blob",
  },
];


export const colorLegend = [
  { color: "rgba(156, 46, 100, 1)", label: "Grassroots" },
  { color: "rgba(167, 44, 10, 1)", label: "Nonprofit" },
  { color: "rgba(138, 72, 10, 1)", label: "Academia" },
  { color: "rgba(107, 87, 16, 1)", label: "Faith-based" },
  { color: "rgba(36, 98, 101, 1)", label: "Government" },
  { color: "rgba(83, 81, 150, 1)", label: "Business" },
  //{ color: 'rgb(119, 70, 132)', label: "Off the charts" },
];
