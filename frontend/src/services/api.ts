import {
  ApiResponse,
  BusinessesResponse,
  BusinessDetails,
  SearchParams,
} from "../types";

// connect frontend and backend
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const fetchBusinesses = async (
  params: SearchParams = {}
): Promise<ApiResponse<BusinessesResponse>> => {
  try {
    const queryParams = new URLSearchParams();

    const shouldFetch = !!(params.keyword || params.type || params.pageToken);
    queryParams.append("shouldFetch", shouldFetch.toString());

    if (params.keyword) queryParams.append("keyword", params.keyword);
    if (params.type) queryParams.append("type", params.type);
    if (params.pageToken) queryParams.append("pageToken", params.pageToken);
    if (params.lat) queryParams.append("lat", params.lat.toString());
    if (params.lng) queryParams.append("lng", params.lng.toString());
    // Remove choose raduis dropdown from SearchBar.tsx
    // We're not passing radius from UI anymore, backend will use the default

    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/businesses${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching businesses:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to fetch businesses",
    };
  }
};

export const fetchBusinessDetails = async (
  placeId: string
): Promise<ApiResponse<BusinessDetails>> => {
  try {
    const url = `${API_BASE_URL}/businesses/${placeId}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching business details:", error);
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch business details",
    };
  }
};

// to help with pagination with Google Places API)
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
