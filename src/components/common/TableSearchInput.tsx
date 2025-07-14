import { CiSearch } from "react-icons/ci";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="flex-1 py-2.5 outline-none border-none text-sm bg-transparent"
    />
  );
};

interface TableSearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
}

export const TableSearchInput = ({
  searchQuery,
  setSearchQuery,
  placeholder = "Search",
}: TableSearchInputProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex items-center gap-x-2 px-3 w-full sm:w-auto sm:basis-[25%] rounded-lg border border-primaryBorder">
      <CiSearch className="h-fit w-fit my-auto" size={24} />
      <SearchInput
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder={placeholder}
      />
    </div>
  );
};
