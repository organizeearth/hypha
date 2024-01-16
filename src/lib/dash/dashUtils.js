import { entities } from "$lib/entities";
// isFilteredIn, hasLatLng, translateToMarker, defaultFilterMethod, filterOptions, colorLegend

const alwaysShowCollab = false;

export const centerCircleId = 'recMQeRkiPRcQ6Fjw';

export const isFilteredIn = (record, filters) => {
  if (alwaysShowCollab && record.id === centerCircleId) {
    return true;
  }
  console.log({record, filters});
  if (
    filters.arena === "ANY" &&
    filters.sector === "ANY" &&
    filters.method === "ANY" &&
    filters.proximity === "ANY" &&
    filters.involvement === "ANY"
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
      typeof record.sector === "undefined" ||
      !record.sector.includes(filters.sector)
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

  if (filters.proximity !== "ANY") {
    if (
      typeof record.proximity === "undefined" ||
      !record.proximity.toLowerCase() == filters.proximity.toLowerCase()
    ) {
      return false;
    }
  }

  if (filters.involvement !== "ANY") {
    if (
      typeof record.involvement === "undefined" ||
      !record.involvement.toLowerCase() == filters.involvement.toLowerCase()
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

export const defaultInvolvement = "active";
export const involvementOptions = [
  {
    value: "active",
    label: "Active collaborators",
    shortLabel: "Active"
  },
  {
    value: "potential",
    label: "Potential collaborators",
    shortLabel: "Potential"
  },
  {
    value: "ANY",
    label: "Whole network",
    shortLabel: "Any"
  },
];

export const proximityOptions = [
  {
    value: "ANY",
    label: "Any",
    shortLabel: "Any"
  },
  {
    value: "frontline",
    label: "Frontline groups",
    shortLabel: "Frontline"
  },
  {
    value: "solidarity",
    label: "Solidarity groups",
    shortLabel: "Solidarity"
  },
  {
    value: "support",
    label: "Support groups",
    shortLabel: "Support"
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

const overrideProximity = (org, collab) => {
  let proximity = org.defaultProximity;
  //console.log({collab});
  if (typeof collab.supportOrgs !== "undefined" && collab.supportOrgs.length && collab.supportOrgs.includes(org.id)) {
    proximity = "Support";
  }
  if (typeof collab.solidarityOrgs !== "undefined" && collab.solidarityOrgs.length && collab.solidarityOrgs.includes(org.id)) {
    proximity = "Solidarity";
  }
  if (typeof collab.frontlineOrgs !== "undefined" && collab.frontlineOrgs && collab.frontlineOrgs.includes(org.id)) {
    proximity = "Frontline";
  }

  return proximity;
}

export const loadOrgsForDash = (orgs, collab) => {
  return orgs.map(function (o) {
    const involvement = collab?.orgs?.includes(o.id) ? "active" : "potential";
    const proximity = overrideProximity(o, collab);
    //console.log({proximity, involvement});
    return {
      ...o,
      proximity,
      involvement
    };
  });
}

export const sectorToLabel = (sectorList) => {
  const labels = {
    recRdF0TaAdUAj40V: "Grassroots",
    rec6f2I3uJzgPOne6: "Nonprofit",
    rec24VSkUdwdHXvAx: "Academia",
    recBkVRn23w2hfMgA: "Faith-based",
    recKEW8pPinfPIEOD: "Government",
    recsL1hjg6GlM4SXG: "Business",
  };
  if (labels[sectorList[0]].length) {
    return labels[sectorList[0]];
  }
  return "Unknown";
}