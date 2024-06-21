import React from "react";

interface CheckBoxProps {
  checkStatus: boolean;
  darkMode: boolean;
  onClick: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checkStatus, darkMode, onClick }) => {
  return (
    <span
      onClick={onClick}
      aria-checked={checkStatus ? "true" : "false"}
      role="checkbox"
      className={`checkbox ${
        darkMode
          ? !checkStatus && "hover:after:bg-secondaryBgD"
          : !checkStatus && "hover:after:bg-secondaryBgL"
      } ${checkStatus ? "checked" : ""}`}
    />
  );
}

export default CheckBox;
