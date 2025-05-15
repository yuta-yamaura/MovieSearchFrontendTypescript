import type { ChangeEventHandler } from "react";
import { z } from "zod";

const VALUES = ["2020", "2021", "2022", "2023", "2024"] as const;
export const yearSchema = z.enum(VALUES);
export type ValidYear = z.infer<typeof yearSchema>;

type SelectYearProps = {
  selectedYear: ValidYear;
  handleYearChange: ChangeEventHandler<HTMLSelectElement>;
};

export const SelectYear = ({
  selectedYear,
  handleYearChange,
}: SelectYearProps) => {
  return (
    <select value={selectedYear} onChange={handleYearChange}>
      {VALUES.map((year) => (
        <option key={year} value={year}>
          {year}年
        </option>
      ))}
    </select>
  );
};
