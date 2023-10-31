import styled, { CSSObject, ThemeProps, ThemedStyledProps } from "styled-components";
import "@fontsource/manrope";
import { Theme } from "../../util/LightTheme";

interface ButtonProps {
  size: ButtonSize;
  buttonType: ButtonType;
}
export enum ButtonType {
  DEFAULT = "DEFAULT",
  FOLLOW = "FOLLOW",
  DELETE = "DELETE",
  OUTLINED = "OUTLINED",
  DISABLED = "DISABLED",
}

export enum ButtonSize {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

const getButtonTypeStyles = (theme:Theme):Record<ButtonType,CSSObject> => ({
  DEFAULT:{
    background: theme.colors.main,
    color: theme.colors.white,
    border:"none",
    ":hover":{
      background: theme.hover.default
    }
  },
  FOLLOW :{
    background: theme.colors.black,
    color: theme.colors.white,
    border:"none",
    ":hover":{
      background: theme.hover.follow
    }
  },
  DELETE : {
    background: theme.colors.error,
    color: theme.colors.white,
    border:"none",
    ":hover":{
      background: theme.hover.error
    }
  },
  OUTLINED : {
    background: theme.colors.white,
    border: `1px solid ${theme.colors.outline}`,
    color: theme.colors.black,
    ":hover":{
      background: theme.hover.outlined
    }
  },
  DISABLED : {
    background: theme.colors.light,
    color: theme.colors.white,
    border:"none",
    ":hover":{
      background: theme.hover.disabled
    }
  },
});

const getButtonSizeStyles = (theme:Theme): Record<ButtonSize, CSSObject> => ({
  SMALL: {
    padding: "8px 16px",
  },
  MEDIUM: {
    padding: "8px 80px",
  },
  LARGE: {
    padding: "8px 192px",
  }
});

export const StyledButton = styled.button<ButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${(props) => getButtonSizeStyles(props.theme)[props.size].padding};
    gap: 8px;
    margin-bottom: 8px;

    background: ${(props) => getButtonTypeStyles(props.theme)[props.buttonType].background};
    border-radius: 40px;

    /* Button */
    font-family: ${(props) => props.theme.font.default};
    font-style: normal;
    font-weight: 800;
    font-size: 15px;
    line-height: 110%;

    border: ${(props) => getButtonTypeStyles(props.theme)[props.buttonType].border};

    color: ${(props) => getButtonTypeStyles(props.theme)[props.buttonType].color};

    text-align: center;

    cursor: pointer;

    transition: 0.3s;

    &:active {
        transform: scale(0.95);
    }

    &:hover {
        ${(props) => getButtonTypeStyles(props.theme)[props.buttonType][":hover"]}
`;
export default StyledButton;
