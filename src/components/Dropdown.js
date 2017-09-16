import React from "react";
import styled from "styled-components";
import Overlay from "components/Overlay";
import { compose, withState } from "recompose";

const Dropdown = styled.div`
  background: white;
  border-radius: 2px;
  display: block;
  left: auto;
  list-style: none;
  margin: 5px 0 0;
  min-width: 240px;
  padding: 0;
  position: absolute;
  right: 0;
  text-align: left;
  top: 100%;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  overflow: auto;
  transform-origin: top right;
  transition: 250ms;
  transform: ${props => (props.active ? "scale(1)" : "scale(0)")};
  opacity: ${props => (props.active ? "1" : "0")};
  max-height: 75vh;
`;
export const Button = styled.button`
  border: 0;
  background: transparent;
  position: relative;
  z-index: 0;
  padding: 0;
  min-height: 42px;
  cursor: pointer;
  font: inherit;
  &:focus {
    outline: none;
  }
`;
const DropdownWrapper = styled(
  compose(withState("active", "setActive"))(props => (
    <div className={`${props.className} dropdown`}>
      <Button onClick={e => props.setActive(!props.active)}>
        {props.toggle}
      </Button>
      <Overlay active={props.active} onClick={e => props.setActive(false)} />
      <Dropdown
        active={props.active}
        onClick={e => props.setActive(!props.active)}
      >
        {props.children}
      </Dropdown>
    </div>
  ))
)`
  position: relative;
`;

export default DropdownWrapper;
