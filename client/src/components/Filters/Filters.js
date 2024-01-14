import React from "react";

import FilterButton from "../FilterButton/FilterButton";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import "./Filters.css";
import { capitalize } from "../../util/string";

const Filters = ({
  filters,
  filterSelection,
  onClick,
  dropDownValues,
  dropDownSelection,
  onSelect,
}) => {
  return (
    <>
      <div className="filter__container">
        <div className="filter__bet-type-container">
          <p>Bet Type</p>
          <div className="filter__bet-type-container-buttons">
            {filters.map((filter, idx) => {
              return (
                <FilterButton
                  key={idx}
                  isActive={filterSelection.statType === filter}
                  onClick={onClick}
                  value={filter}
                  label={capitalize(filter)}
                />
              );
            })}
          </div>
        </div>
        {dropDownValues.length > 0 && (
          <div className="filter__selection-container">
            <p>Selection</p>
            <FilterDropdown
              values={dropDownValues}
              onSelect={onSelect}
              dropDownSelection={dropDownSelection}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Filters;
