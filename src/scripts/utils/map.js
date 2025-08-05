export const initMap = (elementId, center = [-2, 118], zoom = 5) => {
  const map = L.map(elementId).setView(center, zoom);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
  return map;
};

export const addMarker = (map, lat, lon, popupText = "") => {
  const marker = L.marker([lat, lon]).addTo(map);
  if (popupText) marker.bindPopup(popupText);
  return marker;
};

export const onMapClick = (map, callback) => {
  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    callback(lat, lng);
  });
};
