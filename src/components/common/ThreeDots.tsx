import React from "react";
import { StyledContainer } from "./Container";
import ThreeDotsSVG from "../../resources/ThreeDots";

const ThreeDots = ({ onClick }: { onClick: () => void }) => {
  return (
    <StyledContainer
      flexDirection={"row"}
      gap={"2px"}
      alignItems={"center"}
      justifyContent="center"
      width={"fit-content"}
      height={"fit-content"}
      padding={"0 2px"}
      borderRadius={"999px"}
      hoverable
      onClick={onClick}
    >
      <ThreeDotsSVG width={20} height={20} style={{ borderRadius: "999px" }} />
    </StyledContainer>
  );
};

export default ThreeDots;
