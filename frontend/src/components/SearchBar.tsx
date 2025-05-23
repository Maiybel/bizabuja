import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (params: { keyword: string; type: string }) => void;
}

const businessTypes = [
  { value: "", label: "Select Business Type" },
  { value: "hospital", label: "Hospitals" },
  { value: "restaurant", label: "Restaurants" },
  { value: "cafe", label: "Cafes" },
  { value: "bar", label: "Bars" },
  { value: "lodging", label: "Hotels" },
  { value: "shopping_mall", label: "Shopping Malls" },
  { value: "bank", label: "Banks" },
  { value: "school", label: "Schools" },
  { value: "supermarket", label: "Supermarkets" },
  { value: "gas_station", label: "Fuel Stations" },
  { value: "pharmacy", label: "Pharmacies" },
  { value: "gym", label: "Gyms" },
  { value: "beauty_salon", label: "Beauty Salons" },
  { value: "car_repair", label: "Car Repair" },
  { value: "clothing_store", label: "Clothing Stores" },
];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      setError("Please enter a location or landmark within FCT, Abuja");
      return;
    }

    if (!type) {
      setError("Please select a business category");
      return;
    }

    // Only if both fields are filled can the user be able to search
    onSearch({
      keyword: trimmedKeyword,
      type,
    });
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);

    if (error) {
      setError("");
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);

    if (error) {
      setError("");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-2/3">
            <label
              htmlFor="keyword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location/Landmark <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="keyword"
              value={keyword}
              onChange={handleKeywordChange}
              placeholder="e.g., Garki, Wuse, Maitama, Gwarinpa (FCT, Abuja only)"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error && !keyword.trim()
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              required
            />
          </div>

          <div className="w-full md:w-1/3">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Business Category <span className="text-red-500">*</span>
            </label>
            <select
              id="type"
              value={type}
              onChange={handleTypeChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error && !type
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300"
              }`}
              required
            >
              {businessTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-md transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={!keyword.trim() || !type}
          >
            Search Businesses
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 w-full max-w-4xl">
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
