import L from "leaflet";

export const pinPopIcon = L.divIcon({
  html: `
    <div style="
      width: 1.6rem;
      height: 1.1rem;
      background: #000; /* color del pin */
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid white;
      box-sizing: border-box;
    "></div>
  `,
  className: "",
  iconSize: [18, 18],
  iconAnchor: [9, 18],
  popupAnchor: [0, -18],
});
