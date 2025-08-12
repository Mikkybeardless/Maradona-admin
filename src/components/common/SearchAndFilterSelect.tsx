import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { IoChevronDownOutline, IoCloseSharp } from "react-icons/io5";

interface SearchableSelectProps {
  name?: string;
  label?: string;
  placeholder?: string;
  onSelectionChange?: (selected: { value: string; label: string }) => void;
  initialValue?: string | null;
  onSearch: (query: string) => void;
  data: { value: string; label: string }[];
  loading?: boolean;
  fetchOptions?: () => void;
  isBold?: boolean;
  bordered?: boolean;
  containerStyle?: string;
}

export const SearchableSelect = ({
  name = "tags",
  label = "Tags",
  placeholder = "Select an option...",
  onSelectionChange = () => {},
  initialValue = "",
  onSearch,
  loading = false,
  data,
  fetchOptions,
  isBold = false,
  bordered = true,
  containerStyle = "rounded-lg p-5  flex flex-col gap-y-2 bg-white",
}: SearchableSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [selectedLabel, setSelectedLabel] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialize selected label
  useEffect(() => {
    if (selectedValue) {
      const option = data.find((opt) => opt.value === selectedValue);
      setSelectedLabel(option ? option.label : selectedValue);
    }
  }, [selectedValue, data]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  // Handle option selection
  const handleOptionSelect = (option: { value: string; label: string }) => {
    setSelectedValue(option.value);
    setSelectedLabel(option.label);
    setIsOpen(false);
    setSearchQuery("");
    onSelectionChange(option);
  };

  // Handle opening modal
  const handleOpen = () => {
    setIsOpen(true);
    // Clear search query when opening
    setSearchQuery("");
    // Fetch fresh data when opening
    if (fetchOptions) fetchOptions();
    // Focus search input after modal opens
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  };

  // Handle closing modal
  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
    // Optional: trigger a fresh fetch or reset search when closing
    if (searchQuery) {
      onSearch(""); // Reset search to show all items
    }
  };

  // Handle clicking outside modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      {/* Trigger Component */}
      <div
        className={`${containerStyle}  ${
          bordered && "border  border-primaryBorder"
        } `}
      >
        <h5 className={`text-sm ${isBold ? "font-bold" : "font-normal"}`}>
          {label}
        </h5>
        <div
          className="p-3 rounded-lg border border-primaryBorder text-sm outline-none cursor-pointer flex items-center justify-between hover:border-gray-400 transition-colors"
          onClick={handleOpen}
        >
          <span className={selectedLabel ? "text-gray-900" : "text-gray-500"}>
            {selectedLabel || placeholder}
          </span>
          <IoChevronDownOutline className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 max-h-96"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">Select {label}</h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IoCloseSharp className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search options..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-48 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto"></div>
                  <p className="mt-2 text-sm">Searching...</p>
                </div>
              ) : data.length > 0 ? (
                <ul className="py-2">
                  {data.map((option) => (
                    <li key={option.value}>
                      <button
                        onClick={() => handleOptionSelect(option)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                          selectedValue === option.value
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-900"
                        }`}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  <p className="text-sm">No {label.toLowerCase()} found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={selectedValue ?? ""} />
    </>
  );
};
