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
    },
    function (error) {
      alert("Błąd pobierania lokalizacji: " + error.message);
    },
  );
});

function shareData() {
  if (navigator.share) {
    navigator.share({
      title: "Zgłoszenie zdarzenia",
      text: `Lokalizacja: ${currentPos.coords.latitude}, ${currentPos.coords.longitude}`,
      files: [photo],
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
