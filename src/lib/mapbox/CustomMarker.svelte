<script>
  import { onMount, getContext } from "svelte";
  import { contextKey } from "svelte-mapbox-4-temp";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function dispatchActivate() {
    dispatch("activate", {
      id: id,
    });
  }
  const { getMap, getMapbox } = getContext(contextKey);
  const map = getMap();
  const mapbox = getMapbox();

  function randomColour() {
    return "white"; //Math.round(Math.random() * 255)
  }

  function move(lng, lat) {
    marker.setLngLat({ lng, lat });
  }

  export let id;
  export let lat;
  export let lng;
  export let label = "Marker";
  export let popupClassName = "beyonk-mapbox-popup";
  export let markerOffset = [0, 0];
  export let popupOffset = 10;
  export let color = randomColour();
  export let popup = true;
  export let popupOptions = {};
  export let markerOptions = {};

  let marker;
  let element;
  let elementPopup;

  let markerel;

  const flyOffsetLat = 0.1;

  $: marker && move(lng, lat);

  onMount(() => {
    const namedParams = Object.assign(
      {
        offset: markerOffset,
      },
      element.hasChildNodes() ? { element } : { color }
    );
    marker = new mapbox.Marker(Object.assign(namedParams, markerOptions));

    markerel = marker.getElement();
    markerel.addEventListener("click", (e) => {
      dispatchActivate();
      map.flyTo({ center: [lng, lat - flyOffsetLat], essential: true });
    });
    markerel.id = id;

    if (popup) {
      const namedPopupParams = {
        offset: popupOffset,
        className: popupClassName,
      };
      const popupEl = new mapbox.Popup(
        Object.assign(namedPopupParams, popupOptions)
      );
      if (elementPopup.hasChildNodes()) {
        popupEl.setDOMContent(elementPopup);
      } else {
        popupEl.setText(label);
      }

      marker.setPopup(popupEl);
    }

    marker.setLngLat({ lng, lat }).addTo(map);

    if (!element.hasChildNodes()) element.remove();

    return () => marker.remove();
  });

  export function getMarker() {
    return marker;
  }
</script>

<button type="button" on:click bind:this={element}>
  <slot />
</button>

<div on:click on:keyup class="popup" bind:this={elementPopup} role="button" tabindex="0">
  <slot name="popup" />
</div>
