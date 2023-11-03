import styled, { CSSObject } from "styled-components";
import { Theme } from "../../util/LightTheme";

interface StyledInputContainerProps {
  mode: InputContainerMode;
}

export enum InputContainerMode {
  DEFAULT = "DEFAULT",
  ROUNDED = "ROUNDED",
}

const getContainerStyles = (
  theme: Theme
): Record<InputContainerMode, CSSObject> => ({
  DEFAULT: {
    borderRadius: "8px",
    padding: "8px",
    outline: `1px solid ${theme.colors.outline}`,
    flexDirection: "column",
    backgroundColor: theme.colors.white,
    transition: "0.3s",
    disabled: {
      backgroundColor: theme.colors.disabled,
    },
  },
  ROUNDED: {
    borderRadius: "30px",
    padding: "16px",
    outline: "none",
    flexDirection: "row",
    backgroundColor: theme.colors.inactiveBackground,
    transition: "0.07s",
    disabled: {
      backgroundColor: theme.colors.white,
      border: `1px solid ${theme.colors.outline}`,
    },
    active: {
      backgroundColor: theme.colors.white,
    },
  },
});

export const StyledInputContainer = styled.div<StyledInputContainerProps>`
  border-radius: ${(props) =>
    getContainerStyles(props.theme)[props.mode].borderRadius};
  padding: ${(props) => getContainerStyles(props.theme)[props.mode].padding};
  outline: ${(props) => getContainerStyles(props.theme)[props.mode].outline};
  background-color: ${(props) =>
    getContainerStyles(props.theme)[props.mode].backgroundColor};
  display: flex;
  flex-direction: ${(props) =>
    getContainerStyles(props.theme)[props.mode].flexDirection};
  gap: 4px;
  transition: ${(props) =>
    getContainerStyles(props.theme)[props.mode].transition};
  width: 100%;

  &.active {
    outline: 1px solid ${(props) => props.theme.colors.main};
    ${(props) => getContainerStyles(props.theme)[props.mode]["active"]};
  }

  &.error {
    border: 1px solid ${(props) => props.theme.colors.error};
  }

  &.disabled {
    ${(props) => getContainerStyles(props.theme)[props.mode]["disabled"]};
  }

  ${(props) =>
    props.mode === InputContainerMode.DEFAULT &&
    "@media (min-width: 600px) {min-width: 350px;}"}
`;
