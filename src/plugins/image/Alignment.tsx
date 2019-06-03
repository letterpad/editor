import React from "react";
import styled from "styled-components";
const StyledAlignment = styled.div`
  position: absolute;
  margin-left: -70px !important;
  left: 50%;
  z-index: 1;

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

const Option = ({
  option,
  onClick,
  selected
}: {
  option: {
    align: string;
    icon: string;
  };
  onClick: any;
  selected: string;
}) => {
  let active = "";
  if (selected === option.align) {
    active = "active";
  }
  return (
    <span onClick={onClick} contentEditable={false}>
      <span
        contentEditable={false}
        className={"material-icons " + active}
        data-align={option.align}
      >
        {option.icon}
      </span>
    </span>
  );
};

const options = [
  { align: "left", icon: "format_indent_increase" },
  { align: "center", icon: "format_align_justify" },
  { align: "wide", icon: "panorama_wide_angle" },
  { align: "full", icon: "menu" },
  { align: "parallax", icon: "unfold_less" }
];

const Alignment = ({
  selected,
  onClick
}: {
  selected: string;
  onClick: Function;
}) => {
  return (
    <StyledAlignment>
      <div className="letterpad-image-options-inner">
        {options.map((option, i) => {
          return (
            <Option
              key={i}
              selected={selected}
              option={option}
              onClick={(e: any) => onClick(e, option.align)}
            />
          );
        })}
      </div>
    </StyledAlignment>
  );
};

export default Alignment;
