import Airtable from 'airtable';
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
    fetchRecords
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
    const arenas = await fetchRecords(base, arenaConfig, arenaFieldMap);
    const sectors = await fetchRecords(base, sectorConfig, sectorFieldMap);
    const methods = await fetchRecords(base, methodConfig, methodFieldMap);
    const links = await fetchRecords(base, linkConfig, linkFieldMap);
    const bulletins = await fetchRecords(base, bulletinConfig, bulletinFieldMap);
    const benchmarks = await fetchRecords(base, benchmarkConfig, benchmarkFieldMap);
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
                arenas,
                sectors,
                methods,
                links,
                bulletins,
                benchmarks,
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