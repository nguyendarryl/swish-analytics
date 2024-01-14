import React from "react";
import Button from "react-bootstrap/Button";

import "./FilterButton.css";

const FilterButton = ({ onClick, isActive, value, label }) => {
  return (
    <Button
      className={`filter-button${isActive && "-selected"}`}
      variant="outline-secondary"
      value={value}
      size="sm"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default FilterButton;
