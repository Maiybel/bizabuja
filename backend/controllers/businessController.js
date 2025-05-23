const googlePlacesService = require("../services/googlePlacesService");

const getBusinesses = async (req, res) => {
  try {
    const {
      keyword = "",
      type = "",
      pageToken = null,
      lat,
      lng,
      shouldFetch = "false",
    } = req.query;

    const shouldActuallyFetch = shouldFetch === "true" || !!pageToken;

    const searchParams = {
      keyword,
      type: type || undefined,
      pageToken: pageToken || undefined,
      shouldFetch: shouldActuallyFetch,
    };

    if (lat && lng) {
      searchParams.location = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };
    }

    console.log("Search params:", searchParams);

    const data = await googlePlacesService.fetchBusinesses(searchParams);

    res.json({
      status: "success",
      data: {
        results: data.results || [],
        next_page_token: data.next_page_token || null,
        totalResults: data.results?.length || 0,
      },
    });
  } catch (error) {
    console.error("getBusinesses error:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Failed to fetch businesses",
    });
  }
};

const searchBusinessesByText = async (req, res) => {
  try {
    const { query, pageToken = null, lat, lng, radius } = req.query;

    if (!query) {
      return res.status(400).json({
        status: "error",
        message: "Search query is required",
      });
    }

    const searchParams = { query, pageToken };

    if (radius) {
      searchParams.radius = parseInt(radius);
    }

    console.log("Text search params:", searchParams);

    const data = await googlePlacesService.searchBusinessesByText(searchParams);

    res.json({
      status: "success",
      data: {
        results: data.results || [],
        next_page_token: data.next_page_token || null,
        totalResults: data.results?.length || 0,
      },
    });
  } catch (error) {
    console.error("searchBusinessesByText error:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Failed to search businesses",
    });
  }
};

const getBusinessDetails = async (req, res) => {
  try {
    const { placeId } = req.params;

    if (!placeId) {
      return res.status(400).json({
        status: "error",
        message: "Place ID is required",
      });
    }

    const placeDetails = await googlePlacesService.getPlaceDetails(placeId);

    res.json({
      status: "success",
      data: placeDetails,
    });
  } catch (error) {
    console.error("getBusinessDetails error:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Failed to fetch business details",
    });
  }
};

module.exports = {
  getBusinesses,
  searchBusinessesByText,
  getBusinessDetails,
};
