const axios = require("axios");
const config = require("../config/apiConfig");

const geocodePlace = async (placeName) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          key: config.GOOGLE_API_KEY,
          address: `${placeName}, FCT, Abuja, Nigeria`,
          region: "ng",
          components: "country:NG",
        },
      }
    );

    const { data } = response;
    if (data.status !== "OK" || !data.results.length) return null;

    const result = data.results[0];
    const { location } = result.geometry;

    const isInAbuja = result.address_components.some((comp) => {
      return (
        comp.types.includes("administrative_area_level_1") &&
        (comp.long_name.includes("Federal Capital Territory") ||
          comp.long_name.includes("FCT") ||
          comp.short_name === "FCT")
      );
    });

    if (!isInAbuja) {
      console.warn(
        `Geocoded location not in Abuja: ${result.formatted_address}`
      );
      return null;
    }

    return {
      lat: location.lat,
      lng: location.lng,
      formatted_address: result.formatted_address,
    };
  } catch (err) {
    console.error("Geocoding failed:", err);
    return null;
  }
};

const isPlaceName = (keyword) => {
  const businessTypes = [
    "restaurant",
    "hospital",
    "bank",
    "school",
    "hotel",
    "pharmacy",
    "supermarket",
    "shop",
    "store",
    "clinic",
    "church",
    "mosque",
    "gas station",
    "petrol station",
    "filling station",
    "atm",
    "mall",
    "market",
    "office",
    "gym",
    "spa",
    "bar",
    "club",
    "cafe",
    "bakery",
    "electronics",
    "clothing",
    "fashion",
    "beauty",
    "salon",
    "mechanic",
  ];
  const term = keyword.toLowerCase();
  return !businessTypes.some((type) => term.includes(type));
};

const validateSearchParams = (keyword, type) => {
  const errors = [];
  if (!keyword?.trim()) errors.push("Location/Area is required");
  if (!type?.trim() || type === "all")
    errors.push("Business category is required");
  return {
    isValid: !errors.length,
    errors,
  };
};

const fetchBusinesses = async ({
  keyword = "",
  type = config.DEFAULT_TYPE,
  pageToken = null,
  location = config.ABUJA_COORDINATES,
  radius = config.DEFAULT_RADIUS,
  shouldFetch = false,
}) => {
  if (!shouldFetch && !pageToken) {
    return { results: [], status: "ZERO_RESULTS", next_page_token: null };
  }

  if (!pageToken) {
    const { isValid, errors } = validateSearchParams(keyword, type);
    if (!isValid) throw new Error(`Validation failed: ${errors.join(", ")}`);
  }

  try {
    let searchLocation = location;
    let searchKeyword = keyword;

    if (keyword && isPlaceName(keyword) && !pageToken) {
      const geocoded = await geocodePlace(keyword);
      if (geocoded) {
        searchLocation = { lat: geocoded.lat, lng: geocoded.lng };
        searchKeyword = "";
      } else {
        throw new Error(`Location \"${keyword}\" not found in FCT, Abuja.`);
      }
    }

    const params = {
      key: config.GOOGLE_API_KEY,
      radius,
      location: `${searchLocation.lat},${searchLocation.lng}`,
    };

    if (type && type !== "all") params.type = type;
    if (searchKeyword) params.keyword = searchKeyword;
    if (pageToken) params.pagetoken = pageToken;

    const url = `${config.GOOGLE_PLACES_API_URL}/nearbysearch/json`;
    const { data } = await axios.get(url, { params });

    if (!["OK", "ZERO_RESULTS"].includes(data.status)) {
      throw new Error(`Google Places API error: ${data.status}`);
    }

    return data;
  } catch (err) {
    console.error("Error fetching businesses:", err);
    throw err;
  }
};

const searchBusinessesByText = async ({
  query,
  pageToken = null,
  location = config.ABUJA_COORDINATES,
  radius = config.DEFAULT_RADIUS,
}) => {
  try {
    const params = {
      key: config.GOOGLE_API_KEY,
      query: `${query} in FCT Abuja Nigeria`,
      location: `${location.lat},${location.lng}`,
      radius,
    };
    if (pageToken) params.pagetoken = pageToken;

    const url = `${config.GOOGLE_PLACES_API_URL}/textsearch/json`;
    const { data } = await axios.get(url, { params });

    if (!["OK", "ZERO_RESULTS"].includes(data.status)) {
      throw new Error(`Google Places API error: ${data.status}`);
    }

    return data;
  } catch (err) {
    console.error("Text search error:", err);
    throw err;
  }
};

const getPlaceDetails = async (placeId) => {
  try {
    const params = {
      key: config.GOOGLE_API_KEY,
      place_id: placeId,
      fields: [
        "name",
        "formatted_address",
        "formatted_phone_number",
        "international_phone_number",
        "geometry",
        "opening_hours",

        "rating",
        "user_ratings_total",
        "website",
        "types",
      ].join(","),
    };

    const url = `${config.GOOGLE_PLACES_API_URL}/details/json`;
    const { data } = await axios.get(url, { params });

    if (data.status !== "OK") {
      throw new Error(`Google Places API error: ${data.status}`);
    }

    return data.result;
  } catch (err) {
    console.error("Place details error:", err);
    throw err;
  }
};

module.exports = {
  fetchBusinesses,
  searchBusinessesByText,
  getPlaceDetails,
  geocodePlace,
  validateSearchParams,
};
