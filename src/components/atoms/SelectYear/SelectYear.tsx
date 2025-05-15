import type { ChangeEventHandler } from "react";

type SelectYearProps = {
  selectedYear: string;
  handleYearChange: ChangeEventHandler<HTMLSelectElement>;
};

export const SelectYear = ({
  selectedYear,
  handleYearChange,
}: SelectYearProps) => {
  return (
    <select value={selectedYear} onChange={handleYearChange}>
      <option value="2020">2020年</option>
      <option value="2021">2021年</option>
      <option value="2022">2022年</option>
      <option value="2023">2023年</option>
      <option value="2024">2024年</option>
    </select>
  );
};
