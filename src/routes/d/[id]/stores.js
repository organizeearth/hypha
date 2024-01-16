import { writable } from 'svelte/store';

// Each filter is one of:
// A single Airtable record ID (string), OR "ANY" (no filter)
export const activeArena = writable('ANY');
export const activeMethod = writable('ANY');
export const activeSector = writable('ANY');
// Proximity options: frontline, solidarity, support, ANY
export const activeProximity = writable('ANY');
// Network options: active, potential, whole
export const activeInvolvement = writable('active');

export const activeOrgId = writable('');