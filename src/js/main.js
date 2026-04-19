let currentPos;
let photo;
let map;
let marker;
let preview = document.getElementById("photoPreview");

document.getElementById("photoCapture").addEventListener("change", (e) => {
  photo = e.target.files[0];
  if (photo) {
    const imageURL = URL.createObjectURL(photo);
    preview.src = imageURL;
    preview.style.display = "block";
    document.getElementById("photoPlaceholder").style.display = "none";
  }

  navigator.geolocation.getCurrentPosition(
    function (position) {
      currentPos = position;

      map = L.map("map").setView(
        [currentPos.coords.latitude, currentPos.coords.longitude],
        13,
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map,
      );

      marker = L.marker([
        currentPos.coords.latitude,
        currentPos.coords.longitude,
      ]).addTo(map);

      const lat = currentPos.coords.latitude;
      const lon = currentPos.coords.longitude;
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
        .then(r => r.json())
        .then(data => {
          const addressBox = document.getElementById("address");
          addressBox.textContent = "📍 " + data.display_name;
          addressBox.style.display = "block";
        })
        .catch(() => {});
    },
    function (error) {
      alert("Błąd pobierania lokalizacji: " + error.message);
    },
  );
});

function shareData() {
  const category = document.getElementById("eventCategory").selectedOptions[0].text;
  const desc = document.getElementById("eventDesc").value.trim();
  const locationText = currentPos
    ? `Lokalizacja: ${currentPos.coords.latitude}, ${currentPos.coords.longitude}`
    : "Lokalizacja nieznana";

  const text = `${category}\n${desc ? desc + "\n" : ""}${locationText}`;

  if (navigator.share) {
    navigator.share({
      title: "Zgłoszenie zdarzenia – 60-tka",
      text,
      files: photo ? [photo] : undefined,
    });
  } else {
    alert("Brak wsparcia dla Web Share API");
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => console.log("[APP] Service Worker zarejestrowany"))
      .catch((error) => console.error("[APP] Błąd rejestracji SW:", error));
  });
}
