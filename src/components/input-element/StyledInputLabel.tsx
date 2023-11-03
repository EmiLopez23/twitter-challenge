import styled from "styled-components";

export const StyledInputLabel = styled.label`
font-family: "Manrope", sans-serif;
font-size: 15px;
font-weight: 400;
color: ${(props) => props.theme.colors.text};
display: flex;
align-items: center;

&.active {
  color: ${(props) => props.theme.colors.main};
}

&.error {
  color: ${(props) => props.theme.colors.error};
}
`;
