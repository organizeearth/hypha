<script>
  import { activeOrgId } from "./stores.js";
  import { Map, controls } from "svelte-mapbox-4-temp/components";
  import { entities } from "$lib/entities.js";
  import BaseballCard from "$lib/BaseballCard.svelte";
  import CustomMarker from "$lib/mapbox/CustomMarker.svelte";

  /**
   * @type Array.<object>
   */
  export let orgs;
  export let arenas;
  export let collabs;

  /** @type string */
  let activeOrgId_value;
  activeOrgId.subscribe((value) => {
    activeOrgId_value = value;
  });

  $: markers = orgs.map((a) => a.marker || {});

  const { GeolocateControl, NavigationControl, ScaleControl } = controls;

  // Usage of methods like setCenter and flyto
  const publicToken =
    "pk.eyJ1IjoiYmFpc29uZyIsImEiOiJ4dXk3eUs4In0.FmLQ2rbiPgEq_XEgIkDP3g";

  let lat = 40.04627940387934;
  let lng = -105.19855768328831;
  let zoom = 10;
  //let center = [40.04627940387934, -105.19855768328831];
  let center = { lat: lat, lng: lng };

  /**
   * @type {Map}
   */
  let mapComponent;

  // Define this to handle `eventname` events - see [GeoLocate Events](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol-events)
  function eventHandler(e) {
    const data = e.detail;
    // do something with `data`, it's the result returned from the mapbox event
  }
  function onReady() {
    console.log({ orgs, markers });
    // console.log({ markers: orgs });
    mapComponent.setCenter([lng, lat], zoom);
    mapComponent.setZoom(zoom);
    //mapComponent.flyTo({ center: [lat, lng] });
  }
  function flyTo(org) {
    console.log({ coords: [org.lat, org.lng] });
    mapComponent.setCenter([org.lng, org.lat], zoom);
    //mapComponent.setCenter([org.lat, org.lng], zoom);
  }
  function handleActivate(event) {
    activeOrgId.set(event.detail.id);
  }
</script>

<Map
  accessToken={publicToken}
  bind:this={mapComponent}
  bind:center
  options={{ scrollZoom: false }}
  on:ready={onReady}
>
  {#each orgs as org}
    <CustomMarker
      on:activate
      on:click={() => flyTo(org)}
      {...org.marker}
      color={org.marker.color}
    >
      <div class="content position-front" slot="popup">
        <!-- <a href="/o/{marker.id}">{marker.label}</a>-->
        <BaseballCard {org} {collabs} {arenas} />
      </div>
    </CustomMarker>
  {/each}
  <NavigationControl />
  <GeolocateControl />
  <ScaleControl />
</Map>

<style>
  :global(.mapboxgl-map) {
    height: 200px;
  }

  :global(.mapboxgl-marker) {
    cursor: pointer;
  }
  .position-front {
    z-index: 9999;
  }
  /*
    .mapboxgl-popup-content {
      background: transparent;
    }*/
</style>
