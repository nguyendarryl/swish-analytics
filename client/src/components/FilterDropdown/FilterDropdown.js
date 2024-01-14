import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "./FilterDropdown.css";
import { capitalize } from "../../util/string";

const FilterDropdown = ({ onSelect, values, dropDownSelection }) => {
  return (
    <Dropdown>
      <DropdownButton
        id="dropdown-basic-button"
        title={capitalize(dropDownSelection)}
        onSelect={onSelect}
        size="sm"
        variant="light"
      >
        {values.map((value, idx) => {
          return (
            <Dropdown.Item key={idx} eventKey={value}>
              {capitalize(value)}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </Dropdown>
  );
};

export default FilterDropdown;
