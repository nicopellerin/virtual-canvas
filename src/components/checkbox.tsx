import React from "react"
import styled from "styled-components"

interface Props {
  className: string
  checked: boolean
}

const Checkbox: React.FC<Props> = ({ className, checked, ...props }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
)

export default Checkbox

// Styles
const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`
const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  /* clippath: inset(50%); */
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${(props: Props) => (props.checked ? "#623CEA" : "#ddd")};
  border-radius: 3px;
  transition: all 150ms;
  cursor: pointer;

  ${Icon} {
    visibility: ${(props: Props) => (props.checked ? "visible" : "hidden")};
  }
`
