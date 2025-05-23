// API Response Types
// export interface ApiResponse<T = any> {
export interface ApiResponse<T = unknown> {
  status: string;
  message?: string;
  // use T as place holder for the data gotten from the api
  data?: T;
}

// Business data types that the api returns
export interface Business {
  place_id: string;
  name: string;
  vicinity: string;
  types: string[];
  rating?: number;
  user_ratings_total?: number;

  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

//search returns the array of information and token for loading the next page of results.
export interface BusinessesResponse {
  results: Business[];
  next_page_token?: string;
}

// When a user clicks a business for more information
export interface BusinessDetails extends Business {
  formatted_address: string;
  formatted_phone_number?: string;
  international_phone_number?: string;
  opening_hours?: {
    weekday_text: string[];
    open_now: boolean;
  };
  website?: string;
}

export interface SearchParams {
  keyword?: string;
  type?: string;
  pageToken?: string;
  lat?: number;
  lng?: number;
}
