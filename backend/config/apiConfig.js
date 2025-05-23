require("dotenv").config();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  console.error("GOOGLE_API_KEY is not defined in .env file");
}

module.exports = {
  GOOGLE_API_KEY,
  GOOGLE_PLACES_API_URL: "https://maps.googleapis.com/maps/api/place",
  ABUJA_COORDINATES: {
    lat: 9.0765,
    lng: 7.3986,
  },
  DEFAULT_RADIUS: 5000,
  DEFAULT_TYPE: "establishment",
};
