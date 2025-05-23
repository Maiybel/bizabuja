import React, { useState } from "react";
import Layout from "../components/layout";
import SearchBar from "../components/SearchBar";
import BusinessList from "../components/BusinessList";
import { fetchBusinessDetails } from "../services/api";
import { BusinessDetails } from "../types";

export default function Home() {
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    type: "",
    // radius: 5000,
  });

  const [selectedBusiness, setSelectedBusiness] =
    useState<BusinessDetails | null>(null);
  const [loading, setLoading] = useState(false);

  // const handleSearch = (params: {
  //   keyword: string;
  //   type: string;
  //   radius?: 5000;
  // }) => {
  //   setSearchParams(params);
  //   setSelectedBusiness(null);
  // };

  const handleSearch = (params: {
    keyword: string;
    type: string;
    radius?: number;
  }) => {
    setSearchParams({
      keyword: params.keyword,
      type: params.type,
      // radius: params.radius ?? 5000,
    });
    setSelectedBusiness(null);
  };

  const handleBusinessClick = async (placeId: string) => {
    setLoading(true);

    try {
      const response = await fetchBusinessDetails(placeId);

      if (response.status === "success" && response.data) {
        setSelectedBusiness(response.data);
      } else {
        console.error("Error fetching business details:", response.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeBusinessDetails = () => {
    setSelectedBusiness(null);
  };

  return (
    <Layout>
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      <BusinessList
        searchParams={searchParams}
        onBusinessClick={handleBusinessClick}
      />

      {selectedBusiness && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center p-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedBusiness.name}
                    </h2>
                    <button
                      onClick={closeBusinessDetails}
                      className="p-1 rounded-full hover:bg-gray-100"
                      aria-label="Close"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {selectedBusiness.rating && (
                    <div className="flex items-center mt-2">
                      <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-medium">
                          {selectedBusiness.rating.toFixed(1)}
                        </span>
                        {selectedBusiness.user_ratings_total && (
                          <span className="text-sm text-gray-500 ml-1">
                            ({selectedBusiness.user_ratings_total} reviews)
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <p className="text-gray-600 mt-4">
                    {selectedBusiness.formatted_address ||
                      selectedBusiness.vicinity}
                  </p>

                  {selectedBusiness.formatted_phone_number && (
                    <p className="text-gray-600 mt-2">
                      📞 {selectedBusiness.formatted_phone_number}
                    </p>
                  )}

                  {selectedBusiness.website && (
                    <p className="text-gray-600 mt-2">
                      🌐{" "}
                      <a
                        href={selectedBusiness.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {selectedBusiness.website}
                      </a>
                    </p>
                  )}

                  {selectedBusiness.opening_hours?.weekday_text && (
                    <div className="mt-4">
                      <h3 className="font-semibold text-gray-800">
                        Opening Hours
                      </h3>
                      <ul className="mt-1 space-y-1">
                        {selectedBusiness.opening_hours.weekday_text.map(
                          (day, index) => (
                            <li key={index} className="text-gray-600">
                              {day}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {selectedBusiness.types &&
                    selectedBusiness.types.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-semibold text-gray-800">
                          Business Type
                        </h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedBusiness.types.map((type, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-sm"
                            >
                              {type.replace(/_/g, " ")}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
