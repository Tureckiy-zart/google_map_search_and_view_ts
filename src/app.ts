import axios from "axios";
type GoogleGeocodingResponse = {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
  status: "OK" | "ZERO_RESULTS";
};

let coordinates = { lat: 40.742903, lng: -73.99279779999999 };

const GOOGLE_API_KEY = "AIzaSyC7Egs_PNRaFezG_ujhw3d-dhITBCkfd8Q",
  form = document.querySelector("form")! as HTMLFormElement,
  addressInput = document.getElementById("address")! as HTMLInputElement;

form.addEventListener("submit", searchAddressHandler);

function searchAddressHandler(e: Event) {
  e.preventDefault();
  const enteredAddress = addressInput.value;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
    enteredAddress
  )}&key=${GOOGLE_API_KEY}`;

  axios
    .get<GoogleGeocodingResponse>(url)
    .then((res) => {
      if (res.data.status !== "OK") {
        throw new Error("Could not find location");
      }
      coordinates = res.data.results[0].geometry.location;

      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 16,
      });

      new google.maps.Marker({
        position: coordinates,
        map,
        // title: "Hello World!",
      });
    })
    .catch((err: any) => {
      alert(err.message);
      //   throw new Error(err.message);
    });
}
