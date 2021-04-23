import React from "react";
import styled from "styled-components";

const CheckboxContainer = styled.label`
  display: inline-block;
`;

const Icon = styled.svg`
  fill: none;
  stroke: ${(props) => (props.checked ? props.backgroundColor : "none")};
  stroke-width: 3px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`;

const StyledCheckbox = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: ${(props) => (props.checked ? props.accentColor : "")};
  border: 2px solid
    ${(props) => (props.checked ? props.accentColor : "#f0f6fc")};
  border-radius: 50%;
  transition: 0.2s;
  cursor: pointer;

  &:hover ${Icon} {
    stroke: ${(props) => (props.checked ? "" : "#f0f6fc")};
  }
`;

const Checkbox = ({
  className,
  checked,
  accentColor,
  backgroundColor,
  ...props
}) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked} accentColor={(accentColor = "#f0f6fc")}>
      <Icon
        checked={checked}
        backgroundColor={(backgroundColor = "#090C10")}
        viewBox="0 0 24 24"
      >
        <polyline points="18 8 11 17 6 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default Checkbox;
