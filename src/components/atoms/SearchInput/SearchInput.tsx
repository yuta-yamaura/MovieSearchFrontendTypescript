import type { ChangeEventHandler } from "react";

type SearchInputProps = {
  searchQuery: string;
  handleSearchChange: ChangeEventHandler<HTMLInputElement>;
};

export const SearchInput = ({
  searchQuery,
  handleSearchChange,
}: SearchInputProps) => {
  return (
    <input
      type="text"
      placeholder="キーワードで検索"
      value={searchQuery}
      onChange={handleSearchChange}
    />
  );
};
