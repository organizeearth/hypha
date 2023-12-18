import Airtable from 'airtable';
import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import {
    myBaseId,
    orgConfig,
    orgFieldMap,
    collabConfig,
    collabFieldMap,
    networkConfig,
    networkFieldMap,
    projectConfig,
    projectFieldMap,
    setupBase,
    fetchRecords,
    methodConfig,
    methodFieldMap,
    sectorConfig,
    sectorFieldMap,
    arenaConfig,
    arenaFieldMap
} from '$lib/airtableConfig.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    //console.log("Hellooooo");
    const id = params.id;
    let base = await setupBase(myBaseId);
    const orgs = await fetchRecords(base, orgConfig, orgFieldMap);
    const collabs = await fetchRecords(base, collabConfig, collabFieldMap);
    const nets = await fetchRecords(base, networkConfig, networkFieldMap);
    const projects = await fetchRecords(base, projectConfig, projectFieldMap);
    const methods = await fetchRecords(base, methodConfig, methodFieldMap);
    const sectors = await fetchRecords(base, sectorConfig, sectorFieldMap);
    const arenas = await fetchRecords(base, arenaConfig, arenaFieldMap);
    if (orgs && collabs && nets) {
        const collab = collabs.find(c => c.id === id);
        const org = orgs.find(o => o.id === id);
        const net = nets.find(n => n.id === id);
        const project = projects.find(p => p.id === id);
        try {
            return {
                id,
                org,
                orgs,
                collab,
                collabs,
                net,
                nets,
                project,
                projects,
                methods,
                sectors,
                arenas
            };
        } catch (e) {
            console.log(e.path);
        }
    }

    throw error(404, 'Not found');
}

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in prod
export const prerender = true;