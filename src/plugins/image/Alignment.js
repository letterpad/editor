import React from "react";
import styled from "styled-components";
const StyledAlignment = styled.div`
  position: absolute;
  margin-left: -90px;
  left: 50%;

  .letterpad-image-options-inner {
    display: flex;
    background: #000;
    padding: 4px 10px;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    > span {
      display: flex;
      .material-icons {
        color: #fff;
        padding: 0 4px;
        cursor: pointer;
        &.active {
          color: #67d44e;
        }
      }
    }
  }
`;

const Option = ({ option, onClick, selected }) => {
  let active = "";
  if (selected === option.align) {
    active = "active";
  }
  return (
    <span onClick={onClick}>
      <span className={"material-icons " + active}>{option.icon}</span>
    </span>
  );
};

const options = [
  { align: "left", icon: "format_indent_increase" },
  { align: "center", icon: "format_align_justify" },
  { align: "wide", icon: "panorama_wide_angle" },
  { align: "full", icon: "menu" }
];

const Alignment = ({ selected, onClick }) => {
  return (
    <StyledAlignment>
      <div className="letterpad-image-options-inner">
        {options.map((option, i) => {
          return (
            <Option
              key={i}
              selected={selected}
              option={option}
              onClick={e => onClick(e, option.align)}
            />
          );
        })}
      </div>
    </StyledAlignment>
  );
};

export default Alignment;
