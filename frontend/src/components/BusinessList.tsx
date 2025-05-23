import React, { useState, useEffect } from "react";
import { Business, BusinessesResponse } from "../types";
import { fetchBusinesses, delay } from "../services/api";
import BusinessCard from "./BusinessCard";

interface BusinessListProps {
  searchParams: {
    keyword: string;
    type: string;
    radius?: number;
    lat?: number;
    lng?: number;
  };
  onBusinessClick: (placeId: string) => void;
}

const BusinessList: React.FC<BusinessListProps> = ({
  searchParams,
  onBusinessClick,
}) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [noMoreResults, setNoMoreResults] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    // Require both keyword and type to perform search so that user can't use just one to search
    if (!searchParams.keyword && !searchParams.type) {
      setHasSearched(false);
      setBusinesses([]);
      setError(null);
      return;
    }

    const loadBusinesses = async () => {
      setLoading(true);
      setHasSearched(true);
      setError(null);
      setBusinesses([]);
      setNextPageToken(null);
      setNoMoreResults(false);

      try {
        const response = await fetchBusinesses(searchParams);

        if (response.status === "success" && response.data) {
          const data = response.data as BusinessesResponse;
          setBusinesses(data.results);
          setNextPageToken(data.next_page_token || null);
          setTotalResults(data.results.length);
          setNoMoreResults(!data.next_page_token);
        } else {
          setError(response.message || "Failed to fetch businesses.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("An error occurred while fetching businesses.");
      } finally {
        setLoading(false);
      }
    };

    loadBusinesses();
  }, [searchParams]);

  const loadMore = async () => {
    if (!nextPageToken || loadingMore) return;

    setLoadingMore(true);

    try {
      // Hadle Google API pagination delay
      await delay(2000);

      const response = await fetchBusinesses({
        ...searchParams,
        pageToken: nextPageToken,
      });

      if (response.status === "success" && response.data) {
        const data = response.data as BusinessesResponse;
        setBusinesses((prev) => [...prev, ...data.results]);
        setNextPageToken(data.next_page_token || null);
        setTotalResults((prev) => prev + data.results.length);
        setNoMoreResults(!data.next_page_token);
      } else {
        setError(response.message || "Failed to fetch more results.");
      }
    } catch (err) {
      console.error("Pagination error:", err);
      setError("An error occurred while loading more results.");
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-blue-500 rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mt-4">
        <p>{error}</p>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="text-blue-700 px-4 py-3 rounded mt-4">
        <p>Enter a location and select a business type to start your search.</p>
      </div>
    );
  }

  if (hasSearched && businesses.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded mt-4">
        <p>No businesses found. Try adjusting your search.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Results ({totalResults})</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {businesses.map((business) => (
          <BusinessCard
            key={business.place_id}
            business={business}
            onClick={onBusinessClick}
          />
        ))}
      </div>
      {/* W3C spiner to diplay when the user clicks search (loading) */}
      {!noMoreResults && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md disabled:bg-blue-300"
          >
            {loadingMore ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default BusinessList;
