import { error } from '@sveltejs/kit';
import {
    myBaseId,
    orgConfig,
    orgFieldMap,
    collabConfig,
    collabFieldMap,
    projectConfig,
    projectFieldMap,
    arenaConfig,
    arenaFieldMap,
    sectorConfig,
    sectorFieldMap,
    methodConfig,
    methodFieldMap,
    setupBase,
    fetchRecords
} from '$lib/airtableConfig.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const id = params.id;

    let base = await setupBase(myBaseId);
    const orgs = await fetchRecords(base, orgConfig, orgFieldMap);
    const collabs = await fetchRecords(base, collabConfig, collabFieldMap);
    const projects = await fetchRecords(base, projectConfig, projectFieldMap);
    const arenas = await fetchRecords(base, arenaConfig, arenaFieldMap);
    const sector = await fetchRecords(base, sectorConfig, sectorFieldMap);
    const methods = await fetchRecords(base, methodConfig, methodFieldMap);

    if (orgs && collabs) {
        const collab = collabs.find(c => c.id === id);
        const org = orgs.find(o => o.id === id);
        const project = projects.find(p => p.id === id);
        try {
            return {
                id,
                org,
                orgs,
                collab,
                collabs,
                project,
                projects,
                arenas,
                sector,
                methods,
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