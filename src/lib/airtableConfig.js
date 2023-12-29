import Airtable from "airtable";
import { VITE_AIRTABLE_BASE_ID } from '$env/static/private';
import { AIRTABLE_KEY } from '$env/static/private';

import { error } from "@sveltejs/kit";

const myBaseId = VITE_AIRTABLE_BASE_ID;
const myApiKey = AIRTABLE_KEY;

const cleanLat = (lat) => {
  return lat || 40.0157514;
};

const cleanLng = (lng) => {
  return lng || -105.2612955;
};

/* @type {AirtableFieldMap[]} */
const orgFieldMap = [
  { from: "Org Name", to: "name" },
  { from: "Org Name", to: "label" },
  { from: "Org Name", to: "color", transform: (a) => "#F57F11" },
  {
    from: "Publishing Status",
    to: "published",
    transform: (a) => a === "Published",
  },
  { from: "Collaboration/ Group", to: "collabs" },
  { from: "Arenas", to: "arenas" },
  { from: "Sectors", to: "sectors" },
  { from: "Methods", to: "methods" },
  { from: "Latitude", to: "lat", transform: (a) => cleanLat(a) },
  { from: "Longitude", to: "lng", transform: (a) => cleanLng(a) },
  { from: "Color", to: "colorcategory" },
  { from: "Color", to: "r", transform: (a) => 30 - a * 4 },
  { from: "Frontline designation", to: "isFrontline" },
  {
    from: "Eng 200 Character Description English",
    to: "description",
    transform: (a) =>
      a.length > 5 ? a : "English-language description pending",
  },
  { from: "Logo", to: "logo" },
  { from: "Website", to: "website" },
];

/* @type {AirtableFieldMap[]} */
const collabFieldMap = [
  { from: "Name", to: "name" },
  {
    from: "Publishing Status",
    to: "published",
    transform: (a) => a === "Published",
  },
  { from: "Orgs", to: "orgs" },
  { from: "Arenas", to: "arenas" },
  { from: "Sectors", to: "sectors" },
  { from: "Methods", to: "methods" },
  { from: "Description", to: "description" },
];

/* @type {AirtableFieldMap[]} */
const networkFieldMap = [
  { from: "Name", to: "name" },
  { from: "Short name", to: "shortname" },
  {
    from: "Publishing Status",
    to: "published",
    transform: (a) => a === "Published",
  },
  { from: "Organizations", to: "orgs" },
  { from: "Collaboratives", to: "collabs" },
];

/* @type {AirtableFieldMap[]} */
const projectFieldMap = [
  { from: "Name", to: "name" },
  { from: "Arenas", to: "arenas" },
  { from: "Sectors", to: "sectors" },
  { from: "Methods", to: "methods" },
];

/* @type {AirtableFieldMap[]} */
const arenaFieldMap = [{ from: "Name", to: "name" }];

/* @type {AirtableFieldMap[]} */
const sectorFieldMap = [{ from: "Name", to: "name" }];

/* @type {AirtableFieldMap[]} */
const methodFieldMap = [{ from: "Name", to: "name" }];

/* @type {AirtableFieldMap[]} */
const linkFieldMap = [
  { from: "Name", to: "name" },
  { from: "URL", to: "url" },
  { from: "Type", to: "type" },
  { from: "Recommended by", to: "orgs" },
  { from: "Published", to: "published" },
  { from: "Media type", to: "mediatype" },
  { from: "Arena(s)", to: "arenas" },
  { from: "Collab(s)", to: "collabs" },
];

/* @type {AirtableFieldMap[]} */
const bulletinFieldMap = [
  { from: "Title", to: "title" },
  { from: "Description", to: "description" },
  { from: "Type", to: "type" },
  { from: "Link", to: "link" },
  { from: "Link text", to: "linktext" },
  { from: "Expiration", to: "expiration" },
  { from: "Pinned", to: "pinned" },
  { from: "Contributing org", to: "org" },
];

/* @type {AirtableFieldMap[]} */
const benchmarkFieldMap = [
  { from: "Name", to: "name" },
  { from: "Date", to: "date" },
  { from: "Notes", to: "notes" },
  { from: "Arenas", to: "arenas" },
];

/* @type {AirtableConfig} */
const orgConfig = {
  tableName: "Orgs",
  selectConfig: {
    view: "Hypha published DO NOT EDIT",
    pageSize: 100,
    fields: [
      "Org Name",
      "Publishing Status",
      "Collaboration/ Group",
      "Arenas",
      "Sectors",
      "Methods",
      "Latitude",
      "Longitude",
      "Color",
      "Frontline designation",
      "Eng 200 Character Description English",
      "Logo",
      "Website",
    ],
  },
};

/* @type {AirtableConfig} */
const collabConfig = {
  tableName: "Collabs",
  selectConfig: {
    view: "Hypha published DO NOT EDIT",
    pageSize: 100,
    fields: [
      "Name",
      "Publishing Status",
      "Orgs",
      "Arenas",
      "Sectors",
      "Methods",
      "Description",
    ],
  },
};

/* @type {AirtableConfig} */
const networkConfig = {
  tableName: "Networks",
  selectConfig: {
    view: "Hypha published DO NOT EDIT",
    pageSize: 100,
    fields: [
      "Name",
      "Short name",
      "Publishing Status",
      "Organizations",
      "Collaboratives",
    ],
  },
};

/* @type {AirtableConfig} */
const projectConfig = {
  tableName: "Projects",
  selectConfig: {
    view: "Hypha published DO NOT EDIT",
    pageSize: 100,
    fields: ["Name", "Arenas", "Sectors", "Methods"],
  },
};

/* @type {AirtableConfig} */
const arenaConfig = {
  tableName: "Arenas",
  selectConfig: {
    view: "Hypha published DO NOT EDIT",
    pageSize: 100,
    fields: ["Name"],
  },
};

/* @type {AirtableConfig} */
const sectorConfig = {
  tableName: "Sectors",
  selectConfig: {
    view: "Hypha published DO NOT EDIT",
    pageSize: 100,
    fields: ["Name"],
  },
};

/* @type {AirtableConfig} */
const methodConfig = {
  tableName: "Methods",
  selectConfig: {
    view: "Hypha published DO NOT EDIT",
    pageSize: 100,
    fields: ["Name"],
  },
};

/* @type {AirtableConfig} */
const linkConfig = {
  tableName: "Links",
  selectConfig: {
    view: "Hypha published DO NOT EDIT",
    pageSize: 100,
    fields: [
      "Name",
      "URL",
      "Type",
      "Recommended by",
      "Published",
      "Media type",
      "Arena(s)",
      "Collab(s)",
    ],
  },
};

/* @type {AirtableConfig} */
const bulletinConfig = {
  tableName: "Bulletins",
  selectConfig: {
    view: "Hypha published DO NOT EDIT",
    pageSize: 100,
    fields: [
      "Title",
      "Description",
      "Type",
      "Link",
      "Link text",
      "Expiration",
      "Pinned",
      "Contributing org",
    ],
  },
};

/* @type {AirtableConfig} */
const benchmarkConfig = {
  tableName: "Benchmarks",
  selectConfig: {
    view: "Hypha published DO NOT EDIT",
    pageSize: 100,
    fields: ["Name", "Date", "Notes", "Arenas"],
  },
};

/**
 *
 * @param {string} baseId
 * @returns {Airtable.Base}
 */
function setupBase(baseId) {
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: AIRTABLE_KEY,
  });
  var base = Airtable.base(baseId);

  return base;
}

/**
 *
 * @param {number} id
 * @param  {Airtable.FieldSet} fields
 * @param  {import('./$types').AirtableFieldMap[]} fieldmap
 * @returns {object} record
 */
function mapFields(id, fields, fieldmap) {
  //console.log( {fields, fieldmap});
  let record = { id };
  for (let i = 0; i < fieldmap.length; i++) {
    const mapping = fieldmap[i];
    const { from, to } = mapping;
    //console.log({ from, to });
    if (typeof fields[from] !== "undefined") {
      if (mapping.hasOwnProperty("transform")) {
        record[to] = mapping.transform(fields[from]);
      } else {
        record[to] = fields[from];
      }
    }
  }

  //console.log({ record });
  return record;
}

function newRecord(record, fieldmap) {
  return mapFields(record.id, record.fields, fieldmap);
}

/**
 *
 * @param {Airtable.Base} base
 * @param {AirtableConfig} config
 * @returns {Array<object>} result
 */
async function fetchRecords(base, config, fieldmap) {
  let result = [];
  let debug = false;
  let first = true;
  try {
    await base(config.tableName)
      .select(config.selectConfig)
      .all()
      .then((records) => {
        records.forEach((r) => {
          result.push(newRecord(r, fieldmap));
          if (debug && first) {
            console.log(r);
            first = false;
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (e) {
    console.error(e);
  }
  return result;
}

/** @type {import('./$types').PageServerLoad} 
export async function load({ params }) {
    //console.log("Hellooooo");
    const id = params.id;
    let base = await setupBase(myBaseId);
    const orgs = await fetchRecords(base, orgConfig, orgFieldMap);
    const collabs = await fetchRecords(base, collabConfig, collabFieldMap);
    const networks = await fetchRecords(base, networkConfig, networkFieldMap);
    if (orgs && collabs && networks) {
        const collab = collabs.find(c => c.id === id);
        const org = collabs.find(o => o.id === id);
        const net = collabs.find(n => n.id === id);
        try {
            return {
                id,
                org,
                orgs,
                collab,
                collabs,
                network,
                networks,
            };
        } catch (e) {
            console.log(e.path);
        }
    }

    throw error(404, 'Not found');
}*/

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in prod
export {
  myBaseId,
  myApiKey,
  orgConfig,
  orgFieldMap,
  collabConfig,
  collabFieldMap,
  networkConfig,
  networkFieldMap,
  projectConfig,
  projectFieldMap,
  arenaConfig,
  arenaFieldMap,
  sectorConfig,
  sectorFieldMap,
  methodConfig,
  methodFieldMap,
  linkConfig,
  linkFieldMap,
  bulletinConfig,
  bulletinFieldMap,
  benchmarkConfig,
  benchmarkFieldMap,
  setupBase,
  fetchRecords,
};
