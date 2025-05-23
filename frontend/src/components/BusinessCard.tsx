import React from "react";
import { Business, BusinessDetails } from "../types/index";

interface BusinessCardProps {
  business: Business | BusinessDetails;
  onClick: (placeId: string) => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, onClick }) => {
  // Get the primary business type and make it look nice
  const getPrimaryType = (types: string[] | undefined) => {
    if (!types || types.length === 0) return "Business";

    // Filter out generic types
    const filteredTypes = types.filter(
      (type) => !["point_of_interest", "establishment", "place"].includes(type)
    );

    // Use the first remaining type or the original first type if all of them were filtered
    const primaryType = filteredTypes.length > 0 ? filteredTypes[0] : types[0];

    // Capitalise the first letters
    return primaryType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Handle directions click
  const handleDirectionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Get location coordinates from the business
    if (business.geometry && business.geometry.location) {
      const { lat, lng } = business.geometry.location;
      // Open Google Maps directions in a new tab
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${business.place_id}`;
      window.open(url, "_blank");
    }
  };

  // Format phone number if available - only exists on BusinessDetails
  // Phone number should appear as (0701 234 5678)
  const phoneNumber =
    "formatted_phone_number" in business
      ? business.formatted_phone_number ||
        (business.international_phone_number &&
          business.international_phone_number.replace(/\s+/g, " ").trim())
      : undefined;

  return (
    <div
      className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-white"
      onClick={() => onClick(business.place_id)}
    >
      <div className="p-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                {getPrimaryType(business.types)}
              </span>
              {/* How to get stars to turn yellow to show the correct rating */}
              {business.rating && (
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400 text-sm">
                        {business.rating && star <= Math.round(business.rating)
                          ? "★"
                          : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    ({business.rating?.toFixed(1)})
                  </span>
                </div>
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mt-1">
              {business.name}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{business.vicinity}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <div>
            {"opening_hours" in business && business.opening_hours && (
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  business.opening_hours.open_now
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {business.opening_hours.open_now ? "Available" : "Unavailable"}
              </span>
            )}
          </div>

          <button
            onClick={handleDirectionsClick}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            Directions
          </button>
        </div>
        {/* need to fix
Phone number should be clickable so that it opens in the dailer */}
        {phoneNumber && (
          <div className="mt-2 text-sm text-gray-600">
            <a
              href={`tel:${phoneNumber.replace(/[^\d+]/g, "")}`}
              onClick={(e) => e.stopPropagation()}
              className="text-gray-600 hover:text-blue-600"
            >
              {phoneNumber}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessCard;
