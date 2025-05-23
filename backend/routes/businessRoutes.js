const express = require("express");
const router = express.Router();
const businessController = require("../controllers/businessController");

// Fetch businesses based on keyword/type/location
router.get("/businesses", businessController.getBusinesses);

// Text-based search for businesses
router.get("/businesses/search", businessController.searchBusinessesByText);

// Get detailed info for a single business
router.get("/businesses/:placeId", businessController.getBusinessDetails);

module.exports = router;
